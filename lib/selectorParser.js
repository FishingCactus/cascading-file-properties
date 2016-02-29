var s = require('string');

function parseSelector(selector) {
  var pos = 0;
  var selectorLength = selector.length;

  var skipWhitespaces = function () {
    var chr = selector.charAt(pos);
    var result = false;
    while (chr === ' ' || chr === '\t' || chr === '\n' || chr === '\r') {
      result = true;
      pos++;
      chr = selector.charAt(pos);
    }
    return result;
  };

  var requireAndSkipWhitespaces = function () {
    if (!skipWhitespaces) {
      throw new Error();
    }
  };

  var parseIdentifier = function () {
    var startPos = pos;
    var chr = s(selector.charAt(pos));

    while (chr.isAlphaNumeric() && !chr.isEmpty()) {
      ++pos;
      chr = s(selector.charAt(pos));
    }

    return selector.substr(startPos, pos - startPos);
  };

  var parseFunctionArguments = function () {
    var chr = selector.charAt(pos);
    if (chr !== '(') {
      throw new Error();
    }
    var result = [];
    skipWhitespaces();
    while (chr !== ')') {
      var startArgPos = pos + 1;
      ++pos;
      chr = selector.charAt(pos);
      while (chr !== ')' && chr !== ',' && chr !== '') {
        ++pos;
        chr = selector.charAt(pos);
      }
      result.push(s(selector.substr(startArgPos, pos - startArgPos)).trim().s);
    }

    ++pos;

    return result;
  };

  var parseSubSelector = function () {
    skipWhitespaces();
    var chr = selector.charAt(pos);
    var subselector;

    if (s(chr).isAlpha()) {
      subselector = {};
      subselector.identifier = parseIdentifier();
      skipWhitespaces();
      chr = selector.charAt(pos);
      if (chr === '(') {
        subselector.arguments = parseFunctionArguments();
        requireAndSkipWhitespaces();
      }
    } else {
      throw new Error('Unknown character');
    }
    return subselector;
  };

  var result = [];
  while (pos < selectorLength) {
    result.push(parseSubSelector());
  }

  return result;
}

module.exports = parseSelector;
