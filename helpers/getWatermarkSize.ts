import { Sharp } from "sharp";
import { INVALID_IMAGE } from "./errorMessages";

/**
 * Computes the size of the watermark based on the ratio and the size of the main image.
 * @async
 * @param {Sharp} mainImage - The main image sharp object to which the watermark will be applied.
 * @param {number} ratio - The ratio by which the size of the watermark will be determined.
 * @throws {Error} - Invalid main image height or width.
 * @returns {Promise<{waterMarkHeight: number, waterMarkWidth: number}>} An object with the computed height and width of the watermark.
 */
const getWatermarkSize = async (
  mainImage: Sharp,
  ratio: number
): Promise<{ waterMarkHeight: number; waterMarkWidth: number }> => {
  const { height: mainImageHeight, width: mainImageWidth } = await mainImage
    .metadata()
    .then(({ height, width }) => {
      return { height, width };
    });

  if (!mainImageHeight || !mainImageWidth) throw INVALID_IMAGE;

  const waterMarkHeight = Math.round(mainImageHeight * ratio);
  const waterMarkWidth = Math.round(mainImageWidth * ratio);

  return { waterMarkHeight, waterMarkWidth };
};

export default getWatermarkSize;
