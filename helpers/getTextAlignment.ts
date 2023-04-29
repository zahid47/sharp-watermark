import { TextAlign } from "sharp";
import type { Options } from "./types";

const getTextAlignment = (
  position: Exclude<Options["position"], undefined>
): TextAlign => {
  if (["left", "top-left", "bottom-left"].includes(position)) return "left";
  if (["right", "top-right", "bottom-right"].includes(position)) return "right";
  return "center";
};

export default getTextAlignment;
