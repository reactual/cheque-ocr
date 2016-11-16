# cheque-ocr [![Build Status](https://travis-ci.org/wealthsimple/cheque-ocr.svg?branch=master)](https://travis-ci.org/wealthsimple/cheque-ocr)

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
      <img src="https://cloud.githubusercontent.com/assets/158675/20336871/7e21714c-ab9b-11e6-890e-70bd0569ce9a.jpg" width="420">
    </td>
    <td>
      <pre>
{
  confidence: '86.748',
  numbers: {
    transit: '00502',
    institution: '010',
    account: '705555'
  }
}</pre>
    </td>
  </tr>
</table>

## Installation

- Required: [node](https://nodejs.org/) v6.8.0 or greater
- Recommended: [n](https://github.com/tj/n) and [avn](https://github.com/wbyoung/avn)
- To install, run `npm install cheque-ocr` [TODO]

## Usage

```js
var chequeOCR = require('cheque-ocr'),
    fs = require('fs');

var image = fs.readFileSync('/path/to/image.jpg');
chequeOCR(image, function(err, result) {
  console.log(err, result);
});
```

For a demo, run `node examples/basic.js`.

## How it works

1. [TODO] Normalize orientation of cheque image.
2. Determine region of interest (ROI) where the MICR Code exists.
3. Within ROI, use Tesseract to convert MICR Code to text.

## Acknowledgements

MICR training data for Tesseract from [BigPino67/Tesseract-MICR-OCR](https://github.com/BigPino67/Tesseract-MICR-OCR)
