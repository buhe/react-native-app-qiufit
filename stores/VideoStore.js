/**
 * Created by guguyanhua on 12/8/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/VideoActionCreators');
var API = require('../api');
//var _ = require('lodash');


var CommentStore = Reflux.createStore({
  listenables: Actions,
  finishTurning: function () {
    API.finishTurning(this.ref.type, this.ref.step);
  },
  fetchComments: function () {

  },
  setRef: function (ref) {
    this.ref = ref;
    this.trigger(this);
  },
  getInitialState: function () {
    this.comments = this.comments || [
          {
            nickname: '热心网友',
            time: Date.now(),
            commentContent: '逍遥哥哥加油!'
          },
          {
            nickname: '热心网友',
            time: Date.now(),
            commentContent: '逍遥哥哥加油!'
          },
          {
            nickname: '热心网友',
            time: Date.now(),
            commentContent: '逍遥哥哥加油!'
          },
          {
            nickname: '热心网友',
            time: Date.now(),
            commentContent: '逍遥哥哥加油!'
          },
          {
            nickname: '热心网友',
            time: Date.now(),
            commentContent: '逍遥哥哥加油!'
          },
          {
            nickname: '热心网友',
            time: Date.now(),
            commentContent: '逍遥哥哥加油!'
          },
        ];
    //this.type = this.type || '';
    //this.step = this.step || '';
    this.ref = this.ref || {};
    return {
      comments: this.comments,
      //type: this.type,
      //step: this.step,
      ref: this.ref,
    };
  },
  reset(){

  }

});

module.exports = CommentStore;
