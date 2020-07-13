//
var assert = require('assert');
var calcUtil = require('../src/calc-util.js');

describe('test of add()', function() {
  it('1 + 2 = 3', function() {
    assert(calcUtil.add(1, 2) === 3);
  });

  it('1 + 2 = 4', function() {
    assert(calcUtil.add(1, 2) === 4);
  });
});
