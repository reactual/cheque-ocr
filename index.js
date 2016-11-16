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
    var response = {
      rawText: text,
    };

    if (result.blocks.length === 0 || result.blocks[0].lines.length === 0) {
      return callback({error: "NO_TEXT_BLOCKS_FOUND"}, response);
    }

    var lines = result.blocks[0].lines;
    var chequeSections = lines[lines.length - 1].words.map(function(section) {
      return constructConfidentText(section.symbols);
    });
    var chequeLine = chequeSections.join("");
    var chequeMatches = CANADIAN_CHEQUE_REGEX.exec(chequeLine);

    if (!chequeMatches) {
      return callback({error: "NO_CHEQUE_NUMBERS_FOUND"}, response);
    }

    response.cheque = removeNonNumericSymbols(chequeMatches.capture('cheque'));
    response.transit = removeNonNumericSymbols(chequeMatches.capture('transit'));
    response.institution = removeNonNumericSymbols(chequeMatches.capture('institution'));
    response.account = removeNonNumericSymbols(chequeMatches.capture('account'));
    
    callback(null, response);
  });
};
