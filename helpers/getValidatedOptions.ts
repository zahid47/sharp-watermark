import defaultOptions from "./defaultOptions";
import {
  INVALID_OPACITY,
  INVALID_POSITION,
  INVALID_RATIO,
  INVALID_X_COORDINATE,
  INVALID_Y_COORDINATE,
} from "./errorMessages";
import positions from "./positions";
import type { Options } from "./types";

/**
 * Validates the options object and returns a new object with validated values.
 * @param {Options} options - An object containing optional values for the options.
 * @throws {Error} Invalid ratio value.
 * @throws {Error} Invalid x-coordinate value.
 * @throws {Error} Invalid y-coordinate value.
 * @throws {Error} Invalid position value.
 * @returns {Options} A new object with validated values.
 */
const getValidatedOptions = (options: Options) => {
  const allOptions = { ...defaultOptions, ...options };
  const { ratio, opacity, position, x, y } = allOptions;

  if (ratio && (ratio < 0 || ratio > 1)) throw INVALID_RATIO;

  if (opacity && (opacity < 0 || opacity > 1)) throw INVALID_OPACITY;

  if (x && x < 0) throw INVALID_X_COORDINATE;

  if (y && y < 0) throw INVALID_Y_COORDINATE;

  if (position && !positions[position]) throw INVALID_POSITION;

  return allOptions;
};

export default getValidatedOptions;
