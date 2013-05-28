var claire = require('claire');
var forAll = claire.forAll;

assert = require('chai').assert;

var gens = require('./generators')
var AlphaStr = gens.AlphaStr, Id = gens.Id, Str = gens.Str;
var Any = gens.Any, Int = gens.Int, Nothing = gens.Nothing;
var ObjectGen = gens.Object;
var ArrayGen =  gens.Array;

function value(gen) {
  return claire.value(null, gen, gen);
};
var PosInt = claire.transform(Math.abs, Int);

var moment = require('moment');
var _ = require('underscore');

var App = require('./models');

function classObjGen(className, attrGens) {
  return claire.label(className)(function() {
    var attr, attrs, gen;

    attrs = { name: value(AlphaStr) };
    for (attr in attrGens) {
      gen = attrGens[attr];
      attrs[attr] = value(gen);
    }
    return new App.Models[className](attrs);
  });
};

var SpecialItem = classObjGen('SpecialItem', {
  type: claire.choice('Feedback', 'ContactForm', 'Document'),
  info: gens.resize(5, ObjectGen(Any))
});

var EndOfUnit = classObjGen('EndOfUnit', {});

var Video = classObjGen('Video', {
  youTubeId: claire.frequency([1, Nothing], [9, Id])
});

var Item = claire.label('Item', claire.choice(SpecialItem, EndOfUnit, Video));

var Unit = classObjGen('Unit', {
  releaseJobId: claire.choice(Nothing, AlphaStr),
  releaseOffset: gens.resize(40, PosInt),
  items: gens.resize(6, ArrayGen(Item))
});

var Class = classObjGen('Class', {
  startDate: claire.transform(function(m) {return m.toDate();}, gens.Moment),
  units: gens.resize(7, ArrayGen(Unit))
});

var distinct = function(obj, copy) {
  return copy && copy !== obj && copy.cid !== obj.cid;
};
var sameClass = function(obj, copy) {
  return copy.className === obj.className && copy instanceof obj.constructor;
};
var withCopy = function(f){return function(obj){return f(obj, obj.copy())}};

describe('Item copy', function() {
  it('is distinct from the original', forAll(Item).satisfy(withCopy(distinct)).asTest());
  it('is the same class as original', forAll(Item).satisfy(withCopy(sameClass)).asTest());
  it('has the same attrs as the original', forAll(Item).satisfy(function(item) {
    return _.isEqual(item.copy().attributes, item.attributes);
  }).asTest());
});

describe('Unit copy', function() {
  it('is distinct from the original', forAll(Unit).satisfy(withCopy(distinct)).asTest());
  it('is the same class as original', forAll(Unit).satisfy(withCopy(sameClass)).asTest());
  it('has no releaseJobId and the same offset', forAll(Unit).satisfy(function(unit) {
    var copy = unit.copy()
    assert.isUndefined(copy.get('releaseJobId'))
    assert.equal(copy.get('releaseOffset'), unit.get('releaseOffset'));
    return true
  }).asTest());
  it('has copies of each item in the items array', forAll(Unit).satisfy(function(unit) {
    var copyItems, unitItems;

    copyItems = unit.copy().get('items');
    unitItems = unit.get('items');
    return _.all(_.zip(copyItems, unit.get('items')), function(itemPairs) {
      return distinct(itemPairs[0], itemPairs[1]) && sameClass(itemPairs[0], itemPairs[1]);
    }) && _.isEqual(_.pluck(copyItems, 'attributes'), _.pluck(unitItems, 'attributes'));
  }).asTest());
});

describe('Class copy', function() {
  it('is distinct from the original with same class', forAll(Class).satisfy(function(cls){
    return withCopy(distinct)(cls) && withCopy(sameClass)(cls)
  }).asTest());

  it('has undefined startDate', forAll(Class).satisfy(function(cls) {
    var copy = cls.copy()
    return copy.startDate === undefined;
  }).asTest());

  it('has copies of the units in the unit array', forAll(Class).satisfy(function(cls) {
    var copy = cls.copy()
    var copyUnits = copy.get('units');
    var clsUnits = cls.get('units');
    return _.all(_.zip(copyUnits, clsUnits), function(uPairs) {
      return distinct.apply(null, uPairs) && sameClass.apply(null, uPairs);
    });
  }).asTest());
});

