/**
 * Created by guguyanhua on 12/8/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/CommentActionCreators');
import API from '../api';
//var _ = require('lodash');


var CommentStore = Reflux.createStore({
  listenables: Actions,
  finishTurning: function () {
    //API.finishTurning(this.state.type,this.state.step);
    API.finishTurning('pushUp',0);
  },
  fetchComments: function () {

  },
  getInitialState: function () {
    this.comments = this.comments || [
      {
        nickname:'热心网友',
        time:Date.now(),
        commentContent:'逍遥哥哥加油!'
      },
      {
        nickname:'热心网友',
        time:Date.now(),
        commentContent:'逍遥哥哥加油!'
      },
      {
        nickname:'热心网友',
        time:Date.now(),
        commentContent:'逍遥哥哥加油!'
      },
      {
        nickname:'热心网友',
        time:Date.now(),
        commentContent:'逍遥哥哥加油!'
      },
      {
        nickname:'热心网友',
        time:Date.now(),
        commentContent:'逍遥哥哥加油!'
      },
      {
        nickname:'热心网友',
        time:Date.now(),
        commentContent:'逍遥哥哥加油!'
      },
    ];
    this.type = this.type || '';
    this.step = this.step || '';
    return {
      comments: this.comments,
      type: this.type,
      step: this.step,
    };
  },
  reset(){

  }

});

module.exports = CommentStore;
