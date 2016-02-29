'use strict';

var assert = require('assert');
require('mocha-sinon');
var parse = require('../lib/selectorParser');

describe('selectorParser', function () {
  it('parse simple id', function () {
    var result = parse('test test2 test3');
    assert(result.length === 3);
    assert(result[0].identifier === 'test');
    assert(result[0].arguments === undefined);
    assert(result[1].identifier === 'test2');
    assert(result[1].arguments === undefined);
    assert(result[2].identifier === 'test3');
    assert(result[2].arguments === undefined);
  });

  it('parse simple function', function () {
    var result = parse('test(a, b, 123)');
    assert(result.length === 1);
    assert(result[0].identifier === 'test');
    assert(result[0].arguments.length === 3);
    assert(result[0].arguments[0] === 'a');
    assert(result[0].arguments[1] === 'b');
    assert(result[0].arguments[2] === '123');
  });
});
