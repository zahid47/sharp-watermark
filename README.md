# sharp-watermark

## Installation

To install sharp-watermark, run the following command in your terminal:

```bash
npm install sharp-watermark
```

OR

```bash
yarn add sharp-watermark
```

## Usage

Here's a basic example of how to use sharp-watermark:

```javascript
import { addImageWatermark } from "sharp-watermark";

const watermarkedImage = await addImageWatermark(
  "path/mainImage.jpg", // or a buffer
  "path/watermark.jpg", // or a buffer
  options
);

// you can save it to a file
watermarkedImage.toFile("watermarkedImage.png");

// or you can convert it to a buffer
const buffer = await watermarkedImage.toBuffer();
```

## Parameters

The `addImageWatermark` function takes the following parameters:

1. `mainImage` (required): The main image to which the watermark will be added. It can be either a string path or a buffer representing the image.
2. `watermarkImage` (required): The watermark image to be added to the main image. It can be either a string path or a buffer representing the image.
3. `options` (optional): an object containing the options for the watermarking process. See the [Options](#options) section for more details.

### Options

The options parameter is an object that contains the following properties:

- ratio (default: `0.6`): the ratio of the watermark image to the main image.
- position (default: `center`): the position of the watermark image. Can be one of the following: `topLeft`, `top`, `topRight`, `left`, `center`, `right`, `bottomLeft`, `bottom`, `bottomRight`.
- x (default: undefined): the x coordinate of the watermark image. This is ignored if the `position` property is passed.
- y (default: undefined): the y coordinate of the watermark image. This is ignored if the `position` property is passed.

## Roadmap

- [x] Add support for buffer as parameter
- [ ] Add support for watermarking multiple images at once
- [ ] Add support for pattern watermarking
- [ ] Add support for watermarking with text
- [ ] Add support for changing the opacity of the watermark

## Special Thanks

- [sharp](https://github.com/lovell/sharp) - The image processing library used in this project
- [jimp-watermark](https://github.com/sushantpaudel/jimp-watermark) - The inspiration for this project. Reasons to use this package over jimp-watermark:
  - Less file size
  - Support for watermark positioning
