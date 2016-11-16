require('./helpers');
var fs = require('fs');

describe('ocr', function() {
  describe('integration test with a valid cheque image', function() {
    it('returns a result', function(done) {
      var image = fs.readFileSync('./test/fixtures/sample_cibc.jpg');
      chequeOcr(image, function(err, result) {
        expect(err).not.to.be.ok;
        expect(result.confidence).to.be.at.least(0);
        expect(result.confidence).to.be.at.most(100);
        expect(result.numbers).to.eql({
          "account": "705555",
          "institution": "010",
          "transit": "00502",
        });
        done();
      });
    });
  });

  describe('integration test with a partial cheque image', function() {
    it('returns the expected error', function(done) {
      var image = fs.readFileSync('./test/fixtures/invalid_partial_numbers.jpg');
      chequeOcr(image, function(err, result) {
        expect(err).to.eql({error: 'NO_CHEQUE_NUMBERS_FOUND'});
        expect(result.numbers).not.to.be.ok;
        done();
      });
    });
  });

  describe('integration test with a non-cheque image that contains no text', function() {
    it('returns the expected error', function(done) {
      var image = fs.readFileSync('./test/fixtures/invalid_no_text.png');
      chequeOcr(image, function(err, result) {
        expect(err).to.eql({error: 'NO_TEXT_BLOCKS_FOUND'});
        expect(result.numbers).not.to.be.ok;
        done();
      });
    });
  });
});
