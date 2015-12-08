/**
 * Created by guguyanhua on 12/8/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/CommentActionCreators');
//var _ = require('lodash');


var CommentStore = Reflux.createStore({
  listenables: Actions,
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
    return {
      comments: this.comments
    };
  },
  reset(){

  }

});

module.exports = CommentStore;
