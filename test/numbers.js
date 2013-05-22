assert = require('assert')
props = require('../toy_props')
describe('properties of numbers', function(){
  'ints floats bigInts'.split(' ').forEach(function(type) {
    'add mul'.split(' ').forEach(function(op) {
      'assoc commute ident closure'.split(' ').forEach(function(prop) {
        it(
          type+" has property '"+prop+"' for operation '"+op+"'",
          props[type][op][prop].asTest({times: 10000})
        )
      })
    })
  })
})
