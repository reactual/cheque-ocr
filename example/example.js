var fs = require('fs'),
    chequeOCR = require('../index');

var images = {
  CIBC: fs.readFileSync('./example/sample_cibc.jpg'),
  SAMPLE: fs.readFileSync('./example/sample_cheque.jpg'),
  INVALID_NO_TEXT: fs.readFileSync('./example/invalid_no_text.png'),
  INVALID_MISSING_NUMBERS: fs.readFileSync('./example/invalid_missing_numbers.jpg'),
  INVALID_PARTIAL_NUMBERS: fs.readFileSync('./example/invalid_partial_numbers.jpg'),
};

for (var institution in images) {
  var image = images[institution];
  chequeOCR(image, function(err, result) {
    if (err) {
      console.warn("Sample invalid image:");
      console.warn(err);
    } else {
      console.log("Sample valid image:");
      console.log(result);
    }
  });
}
