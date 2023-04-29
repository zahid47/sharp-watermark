import Sharp from "sharp";
import getValidatedOptions from "./helpers/getValidatedOptions";
import getWatermarkSize from "./helpers/getWatermarkSize";
import positions from "./helpers/positions";
import getTextAlignment from "./helpers/getTextAlignment";
import getAlpha from "./helpers/getAlpha";
import { Options } from "./helpers/types";

/**
 * Adds a watermark image to a main image.
 * @async
 * @param {string|Buffer} mainImage - The main image to which the watermark will be added.
 * @param {string|Buffer} watermarkImage - The watermark image to be added to the main image.
 * @param {Options} options - An object containing optional values for the watermark position, size, etc.
 * @throws {Error} Invalid ratio value.
 * @throws {Error} Invalid x-coordinate value.
 * @throws {Error} Invalid y-coordinate value.
 * @throws {Error} Invalid position value.
 * @returns {Promise<Sharp.Sharp>} The main image object with the watermark applied.
 */
export const addImageWatermark = async (
  mainImage: string | Buffer,
  watermarkImage: string | Buffer,
  options: Options = {}
): Promise<Sharp.Sharp> => {
  const { ratio, position, x, y } = getValidatedOptions(options);

  const mainImageSharp = Sharp(mainImage);

  const { waterMarkWidth } = await getWatermarkSize(mainImageSharp, ratio);

  const mainImageBuffer = await mainImageSharp.toBuffer();

  const watermarkImageBuffer = await Sharp(watermarkImage).toBuffer();

  const watermark = await Sharp(watermarkImageBuffer)
    .resize(waterMarkWidth) // only passing width will maintain the aspect ratio
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

/**
 * Adds a watermark text to a main image.
 * @async
 * @param {string|Buffer} mainImage - The main image to which the watermark will be added.
 * @param {string} watermarkText - The watermark text to be added to the main image.
 * @param {Options} options - An object containing optional values for the watermark position, size, opacity, etc.
 * @throws {Error} Invalid x-coordinate value.
 * @throws {Error} Invalid y-coordinate value.
 * @throws {Error} Invalid position value.
 * @returns {Promise<Sharp.Sharp>} The main image object with the watermark applied.
 */
export const addTextWatermark = async (
  mainImage: string | Buffer,
  watermarkText: string,
  options: Options = {}
): Promise<Sharp.Sharp> => {
  const { dpi, opacity, position, x, y } = getValidatedOptions(options);

  const mainImageBuffer = await Sharp(mainImage).toBuffer();

  const textColor = `#000000${getAlpha(opacity)}`;

  const watermarkObj = {
    text: {
      text: `<span foreground="${textColor}">${watermarkText}</span>`,
      align: getTextAlignment(position),
      dpi: dpi,
      rgba: true,
    },
  };

  return Sharp(mainImageBuffer)
    .composite([
      {
        input: watermarkObj,
        top: y,
        left: x,
        gravity: positions[position],
      },
    ])
    .withMetadata();
};
