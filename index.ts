import Sharp from "sharp";

const defaultOptions = {
  ratio: 0.6,
  // opacity: 0.6,
  position: "center",
  x: undefined,
  y: undefined,
};

interface Options {
  ratio?: number;
  // opacity?: number;
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  x?: number;
  y?: number;
}

interface Position {
  [key: string]: Sharp.Gravity;
}

const positions: Position = {
  center: "center",
  top: "north",
  bottom: "south",
  left: "west",
  right: "east",
  topLeft: "northwest",
  topRight: "northeast",
  bottomLeft: "southwest",
  bottomRight: "southeast",
};

const validateOptions = (options: Options) => {
  const { ratio, position, x, y } = options;

  if (ratio && (ratio < 0 || ratio > 1)) {
    throw new Error("Ratio should be between 0 and 1");
  }
  // if (opacity && (opacity < 0 || opacity > 1)) {
  //   throw new Error("Opacity should be between 0 and 1");
  // }
  if (x && x < 0) {
    throw new Error("X coordinate should be greater than 0");
  }
  if (y && y < 0) {
    throw new Error("Y coordinate should be greater than 0");
  }
  if (position) {
    if (!positions[position]) {
      throw new Error(
        "Invalid position. Valid positions are: center, top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight"
      );
    }
  }

  return true;
};

export const addWatermark = async (
  mainImage: any,
  watermarkImage: any,
  options: Options
) => {
  validateOptions(options);
  const { ratio, position, x, y } = { ...defaultOptions, ...options };

  const mainImageSharp = Sharp(mainImage);

  const { height: mainImageHeight, width: mainImageWidth } =
    await mainImageSharp.metadata().then(({ height, width }) => {
      return { height, width };
    });

  const waterMarkHeight = Math.round(mainImageHeight! * ratio);
  const waterMarkWidth = Math.round(mainImageWidth! * ratio);

  const mainImageBuffer = await mainImageSharp.toBuffer();

  const watermarkImageBuffer = await Sharp(watermarkImage).toBuffer();

  const watermark = await Sharp(watermarkImageBuffer)
    .resize(waterMarkWidth, waterMarkHeight)
    .toBuffer();

  return Sharp(mainImageBuffer)
    .composite([
      {
        input: watermark,
        top: y,
        left: x,
        gravity: positions[position],
      },
    ])
    .withMetadata();
};
