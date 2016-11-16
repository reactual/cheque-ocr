var fs = require('fs'),
    chequeOCR = require('../index');

var image = fs.readFileSync('./test/fixtures/sample_cibc.jpg');
console.log("Attempting to OCR a sample cheque image...");

chequeOCR(image, function(err, result) {
  if (err) {
    console.warn("Something went wrong:");
    console.warn(err);
  } else {
    console.log("Results:");
    console.log(JSON.stringify(result, null, 4));
  }
});
