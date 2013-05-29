'use strict'
var gen = require('./generators')
var forall = require('claire').forAll

module.exports = {
  ints: {
    add: {
      assoc: forall(gen.Int, gen.Int, gen.Int).satisfy(function(x, y, z){
        return (x+y)+z === x+(y+z)
      })
      ,commute: forall(gen.Int, gen.Int).satisfy(function(x, y) {
        return x+y === y+x
      })
      ,ident: forall(gen.Int).satisfy(function(x) {
        return x+0 === x
      })
      ,closure: forall(gen.Int, gen.Int).satisfy(function(x, y){
        return x+y === Math.floor(x+y)
      })
    }
    ,mul: {
      assoc: forall(gen.Int, gen.Int, gen.Int).satisfy(function(x, y, z){
        return (x*y)*z === x*(y*z)
      })
      ,commute: forall(gen.Int, gen.Int).satisfy(function(x, y) {
        return x*y === y*x
      })
      ,ident: forall(gen.Int).satisfy(function(x) {
        return x*1 === x
      })
      ,closure: forall(gen.Int, gen.Int).satisfy(function(x, y){
        return x*y === Math.floor(x*y)
      })
    }
  }
  ,floats: {
    add: {
      assoc: forall(gen.Num, gen.Num, gen.Num).satisfy(function(x, y, z){
        return (x+y)+z === x+(y+z)
      })
      ,commute: forall(gen.Num, gen.Num).satisfy(function(x, y) {
        return x+y === y+x
      })
      ,ident: forall(gen.Num).satisfy(function(x) {
        return x+0 === x
      })
      ,closure: forall(gen.Num, gen.Num).satisfy(function(x, y){
        return x+y === x+y
      })
    }
    ,mul: {
      assoc: forall(gen.Num, gen.Num, gen.Num).satisfy(function(x, y, z){
        return (x*y)*z === x*(y*z)
      })
      ,commute: forall(gen.Num, gen.Num).satisfy(function(x, y) {
        return x*y === y*x
      })
      ,ident: forall(gen.Num).satisfy(function(x) {
        return x*1 === x
      })
      ,closure: forall(gen.Num, gen.Num).satisfy(function(x, y){
        return x*y === x*y
      })
    }
  }
  ,bigInts: {
    add: {
      assoc: forall(gen.BigInt, gen.BigInt, gen.BigInt).satisfy(function(x, y, z){
        return (x+y)+z === x+(y+z)
      })
      ,commute: forall(gen.BigInt, gen.BigInt).satisfy(function(x, y) {
        return x+y === y+x
      })
      ,ident: forall(gen.BigInt).satisfy(function(x) {
        return x+0 === x
      })
      ,closure: forall(gen.BigInt, gen.BigInt).satisfy(function(x, y){
        return x+y === Math.floor(x+y)
      })
    }
    ,mul: {
      assoc: forall(gen.BigInt, gen.BigInt, gen.BigInt).satisfy(function(x, y, z){
        return (x*y)*z === x*(y*z)
      })
      ,commute: forall(gen.BigInt, gen.BigInt).satisfy(function(x, y) {
        return x*y === y*x
      })
      ,ident: forall(gen.BigInt).satisfy(function(x) {
        return x*1 === x
      })
      ,closure: forall(gen.BigInt, gen.BigInt).satisfy(function(x, y){
        return x*y === Math.floor(x*y)
      })
    }
  }
}

