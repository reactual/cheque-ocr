# cheque-ocr

Optical Character Recognition for cheques using the [MICR Code](https://en.wikipedia.org/wiki/Magnetic_ink_character_recognition) standard.

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Output</th>
    </tr>
  </thead>
  <tr>
    <td>
      <img src="https://cloud.githubusercontent.com/assets/158675/20335204/9e83d266-ab8e-11e6-899b-48caa8938841.jpg" width="500">
    </td>
    <td>
      <pre>
{
  cheque: '184',
  transit: '00502',
  institution: '010',
  account: '705555'
}</pre>
    </td>
  </tr>
</table>

## Installation

- Required: Node v7.1
- Recommended: [n](https://github.com/tj/n) and [avn](https://github.com/wbyoung/avn)
- To install, run `npm install cheque-ocr`

## Usage

```js
var chequeOCR = require('cheque-ocr'),
    fs = require('fs');

var image = fs.readFileSync('/path/to/image.jpg');
chequeOCR(image, function(err, result) {
  console.log(err, result);
});
```

For a demo, run `node example/example.js`.

## How it works

1. [WIP] Normalize orientation of cheque image.
2. Determine region of interest (ROI) where the MICR Code exists within the cheque image.
3. Within ROI, use Tesseract to convert MICR Code to text.

## Acknowledgements

MICR training data for Tesseract from [BigPino67/Tesseract-MICR-OCR](https://github.com/BigPino67/Tesseract-MICR-OCR/tree/master/training/tessdata)
