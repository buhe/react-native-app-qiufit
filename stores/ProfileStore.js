/**
 * Created by guguyanhua on 12/2/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/ProfileActionCreators');
var API = require('../api');
//var _ = require('lodash');


var ExamStore = Reflux.createStore({
  listenables: Actions,
  pullTurningDate: function () {
    API.pullTurningDate(function(data){
      this.checkIn = data;
      this.trigger(this);
    }.bind(this),function(err){}.bind(this));
  },
  getInitialState: function () {
    this.checkIn = this.checkIn || {};
    return {
      checkIn: this.checkIn
    };
  },
  reset(){
  }

});

module.exports = ExamStore;
