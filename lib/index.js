'use strict';

var fs = require('fs');
var css = require('css');

var Context = function () {
  this.Rules = [];
};

Context.prototype.loadPropertyFile = function (filepath, callback) {
  var that = this;
  fs.readFile(filepath, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    that.loadProperties(data, callback, filepath);
  });
};

Context.prototype.loadProperties = function (text, callback, source) {
  source = source || 'unknown';
  try {
    var obj = css.parse(text, {source: source});
    console.log(css.stringify(obj));
    callback();
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  Context: Context
};
