# sharp-watermark

## Installation

```bash
npm install sharp-watermark
```

OR

```bash
yarn add sharp-watermark
```

## Usage

```javascript
import { addWatermark } from "sharp-watermark";

const watermarkedImage = await addWatermark(
  "mainImgPath.png",
  "watermarkPath.jpg",
  options
);

// now you can do whatever you want with the watermarked image

// for example, you can save it to a file
watermarkedImage.toFile("watermarkedImage.png");

// or you can convert it to a buffer
const buffer = await watermarkedImage.toBuffer();
```

## Parameters
1. `mainImgPath` - path to the main image
2. `watermarkPath` - path to the watermark image
3. `options` (optional) - an object containing the options for the watermarking process. See the [Options](#options) section for more details.

### Options
- ratio - the ratio of the watermark image to the main image. Default is 0.6
- position - the position of the watermark image. Default is `center`. Can be one of the following: `topLeft`, `top`, `topRight`, `left`, `center`, `right`, `bottomLeft`, `bottom`, `bottomRight`
- x - the x coordinate of the watermark image
- y - the y coordinate of the watermark image

NOTE: If you specify the the `position` option, the `x` and `y` options will be ignored.

## Roadmap
- Add support for buffer as parameter
- Add support for watermarking multiple images at once
- Add support for pattern watermarking
- Add support for watermarking with text
- Add support for changing the opacity of the watermark


## Special Thanks
- [sharp](https://github.com/lovell/sharp) - The image processing library used in this project
- [jimp-watermark](https://github.com/sushantpaudel/jimp-watermark) - The inspiration for this project. Reasons to use this package over jimp-watermark:
  - Less file size
  - Support for watermark positioning