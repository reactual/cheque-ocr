var Tesseract = require('tesseract.js');
var named = require('named-regexp').named;

var LANGUAGE_CODE = 'mcr';
var LANGUAGE_PATH = './';
var MICR_CHARACTERS = '0123456789abcd';
var TESSERACT_CLIENT = Tesseract.create({langPath: LANGUAGE_PATH});
var CONFIDENCE_THRESHOLD_PERCENT = 50;
var CANADIAN_CHEQUE_REGEX = named(/c(:<cheque>[0-9]{3,})ca(:<transit>[0-9]{4,5})d(:<institution>[0-9]{3})a(:<account>[dc0-9]+)/);

function constructConfidentText(symbols) {
  return symbols.filter(function(symbol) {
    return symbol.confidence > CONFIDENCE_THRESHOLD_PERCENT;
  }).map(function(symbol) {
    return symbol.text;
  }).join("");
}

function removeNonNumericSymbols(text) {
  return text.replace(/\D/g,'');
}

module.exports = function(image, callback) {
  TESSERACT_CLIENT.recognize(image, {
    lang: LANGUAGE_CODE,
    tessedit_char_whitelist: MICR_CHARACTERS,
  }).then(function(result){
    var text = result.text;

    // TODO: this section of code needs to be tested.
    var lines = result.blocks[0].lines;
    var chequeSections = lines[lines.length - 1].words.map(function(section) {
      return constructConfidentText(section.symbols);
    });
    var chequeLine = chequeSections.join("");
    var chequeMatches = CANADIAN_CHEQUE_REGEX.exec(chequeLine);

    var response = {
      cheque: removeNonNumericSymbols(chequeMatches.capture('cheque')),
      transit: removeNonNumericSymbols(chequeMatches.capture('transit')),
      institution: removeNonNumericSymbols(chequeMatches.capture('institution')),
      account: removeNonNumericSymbols(chequeMatches.capture('account')),
      rawText: text,
    };
    callback(response);
  });
};
