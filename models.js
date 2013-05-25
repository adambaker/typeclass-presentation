var bb = require('backbone');

var App = {
  Models: {
    SpecialItem: bb.Model.extend({
      copy: function(){ return new App.Models.SpecialItem(this.attributes) }
    })
    ,Video: bb.Model.extend({
      copy: function(){ return new App.Models.Video(this.attributes) }
    })
    ,EndOfUnit: bb.Model.extend({
      copy: function(){ return new App.Models.EndOfUnit(this.attributes) }
    })
  }
}

module.exports = App
