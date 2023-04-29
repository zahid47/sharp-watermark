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

### Add an **image** watermark:

```javascript
import { addImageWatermark } from "sharp-watermark";

const watermarkedImage = await addImageWatermark(
  "path/mainImage.jpg", // or a buffer
  "path/watermark.jpg", // or a buffer
  options
);
```

#### Parameters

The `addImageWatermark` function takes the following parameters:

1. `mainImage` (required): The main image to which the watermark will be added. It can be either a string path or a buffer representing the image.
2. `watermarkImage` (required): The watermark image to be added to the main image. It can be either a string path or a buffer representing the image.
3. `options` (optional): an object containing the options for the watermarking process. See the [Options](#options) section for more details.

### Add a **text** watermark:

```javascript
import { addTextWatermark } from "sharp-watermark";

const watermarkedImage = await addTextWatermark(
  "path/mainImage.jpg", // or a buffer
  "Hello World!",
  options
);
```

#### Parameters

The `addTextWatermark` function takes the following parameters:

1. `mainImage` (required): The main image to which the watermark will be added. It can be either a string path or a buffer representing the image.
2. `watermarkText` (required): The text to be used as the watermark.
3. `options` (optional): an object containing the options for the watermarking process. See the [Options](#options) section for more details.

Access the watermarked image:

```javascript
// you can save it to a file
watermarkedImage.toFile("watermarkedImage.png");

// or you can convert it to a buffer
const buffer = await watermarkedImage.toBuffer();
```

### Options

The options parameter is an object that contains the following properties:

- ratio (default: `0.4`): the ratio of the watermark image to the main image.
- dpi (default: `300`): Size of the text. Only applicable for text watermarking.
- opacity (default: `0.6`): the opacity of the watermark text. Only applicable for text watermarking.
- position (default: `center`): the position of the watermark image. Can be one of the following: `topLeft`, `top`, `topRight`, `left`, `center`, `right`, `bottomLeft`, `bottom`, `bottomRight`. Ignored if both `x` & `y` property is passed.
- x (default: `undefined`): the x coordinate of the watermark image.
- y (default: `undefined`): the y coordinate of the watermark image.

## Special Thanks

- [sharp](https://github.com/lovell/sharp) - The image processing library used in this project.
- [jimp-watermark](https://github.com/sushantpaudel/jimp-watermark) - The inspiration for this project. Reasons to use this package over jimp-watermark:
  - Less file size.
  - Support for watermark positioning.
  - built in type definitions.
