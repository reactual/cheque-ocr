# cheque-ocr

Optical Character Recognition for cheques using the [MICR Code](https://en.wikipedia.org/wiki/Magnetic_ink_character_recognition) standard.

## Installation

- Required: Node v7.1
- Recommended: [n](https://github.com/tj/n) and [avn](https://github.com/wbyoung/avn)
- To install, run `npm install cheque-ocr`

## Usage

Run `node example/example.js`

## How it works

1. [WIP] Normalize orientation of cheque image.
2. Determine region of interest (ROI) where the MICR Code exists within the cheque image.
3. Within ROI, use Tesseract to convert MICR Code to text.

## Acknowledgements

MICR training data for Tesseract from [BigPino67/Tesseract-MICR-OCR](https://github.com/BigPino67/Tesseract-MICR-OCR/tree/master/training/tessdata)
