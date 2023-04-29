import { Gravity } from "sharp";

export interface Options {
  ratio?: number;
  dpi?: number;
  opacity?: number;
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

export interface Position {
  [key: string]: Gravity;
}
