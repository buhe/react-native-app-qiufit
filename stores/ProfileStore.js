/**
 * Created by guguyanhua on 12/2/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/TypeActionCreators');
//var _ = require('lodash');


var ExamStore = Reflux.createStore({
  listenables: Actions,
  fetchAll: function () {
  },
  getInitialState: function () {
    this.exam = this.exam || {};
    return {
      exam: this.exam
    };
  },
  reset(){
    this.exam = {};
  }

});

module.exports = ExamStore;
