var fs = require('fs'),
    chequeOCR = require('../index');

var images = {
  CIBC: fs.readFileSync('./example/sample_cibc.jpg'),
  SAMPLE: fs.readFileSync('./example/sample_cheque.jpg'),
};

for (var institution in images) {
  var image = images[institution];
  chequeOCR(image, function(result) {
    console.log(result);
  });
}
