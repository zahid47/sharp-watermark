import Sharp from "sharp";
import getValidatedOptions from "../helpers/getValidatedOptions";
import getWatermarkSize from "../helpers/getWatermarkSize";
import positions from "../helpers/positions";
import { Options } from "../helpers/types";

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
  options: Options
): Promise<Sharp.Sharp> => {
  const { ratio, position, x, y } = getValidatedOptions(options);

  const mainImageSharp = Sharp(mainImage);

  const { waterMarkHeight, waterMarkWidth } = await getWatermarkSize(
    mainImageSharp,
    ratio
  );

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
