var _ = require('underscore')
var moment = require('moment')
var curry = require('prelude-ls').curry
var claire = require('claire')
var gens = claire.data

var resize = curry(function(n, gen){
  return claire.sized(function(){return n}, gen)
});
var PosInt = claire.transform(Math.abs, gens.Int)

module.exports = _.extend({
  PosInt: PosInt
  ,BigInt: claire.transform(
    function(n){return Math.floor(n*2)},
    resize(Number.MAX_VALUE/2, gens.Num)
  )
  ,Time: claire.label('time')(claire.transform(function(hm) {
    return { hours: hm[0], minutes: hm[1] }
  }, claire.sequence(posIntOf(24), posIntOf(60))))
  ,Moment: claire.label('moment', claire.transform(moment.unix, posIntOf(2000000000)))
  ,resize: resize
  ,posIntOf: posIntOf
  ,yes: function(){return true}
}, gens)

function posIntOf(n) {
  return claire.sized(function() { return n; }, PosInt);
}

