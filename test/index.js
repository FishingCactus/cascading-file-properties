'use strict';

var assert = require('assert');
require('mocha-sinon');
var mockfs = require('mock-fs');
var cascadingFileProperties = require('../lib');

describe('cascading-file-properties', function () {
  it('should callback when done', function () {
    var callback = this.sinon.spy();

    var context = new cascadingFileProperties.Context();

    context.loadProperties('a{}', callback);
    assert(callback.called);
    assert(callback.calledWith());
  });

  it('should fail on wrong data', function () {
    var callback = this.sinon.spy();

    var context = new cascadingFileProperties.Context();

    context.loadProperties('a{ %%% }', callback);
    assert(callback.called);
  });

  it('should load file and call loadProperties in loadPropertyFile', function () {
    var context = new cascadingFileProperties.Context();
    var spy = this.sinon.spy(context, 'loadProperties');
    var callback = this.sinon.spy();

    mockfs({
      'data/test.cfp': 'test {}'
    });

    context.loadPropertyFile('data/test.cfp', callback);
    spy.calledWith('test {}', callback, 'data/test.cfp');
    callback.calledWith();
  });
});
