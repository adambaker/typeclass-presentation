var _ = require('underscore')
var curry = require('prelude-ls').curry
var claire = require('claire')
var gens = claire.data

var resize = curry(function(n, gen){
  return claire.sized(function(){return n}, gen)
});

module.exports = _.extend({
  PosInt: claire.transform(Math.abs, gens.Int)
  ,BigInt: claire.transform(
    function(n){return Math.floor(n*2)},
    resize(Number.MAX_VALUE/2, gens.Num)
  )
  ,resize: resize
}, gens)
