var Moment, PosInt, Time, claire, sized, toMomentAfter;

var moment = require('moment');

var claire = require('claire');

sized = claire.sized;

PosInt = claire.transform(Math.abs, claire.data.Int);

posIntOf = function(n) {
  return claire.sized(function() { return n; }, PosInt);
}; //returns a generator of ints from 0 to n - 1

Time = claire.label('time')(claire.transform(function(hm) {
  return { hours: hm[0], minutes: hm[1] };
}, claire.sequence(posIntOf(24), posIntOf(60))));

Moment = claire.label('moment', claire.transform(moment, posIntOf(2000000000000)));


describe('toMomentAfter', function() {
  it('has the right hours and minutes', claire.forAll(Time, Moment).satisfy(function(t, m) {
    var mo = toMomentAfter(t, m);
    return mo.hours() === t.hours && mo.minutes() === t.minutes;
  }).asTest());

  it('is after the provided moment', claire.forAll(Time, Moment).satisfy(function(t, m) {
    var mo = toMomentAfter(t, m);
    return m <= mo && mo <= moment(m).add('d', 1);
  }).asTest());
});


function toMomentAfter(time, reference) {
  var result = moment();

  return result
}
