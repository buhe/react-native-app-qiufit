/**
 * Created by guguyanhua on 12/8/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/VideoActionCreators');
var API = require('../api');
import moment from 'moment';
//var _ = require('lodash');


var CommentStore = Reflux.createStore({
  listenables: Actions,
  refreshComments: function () {
    API.getComment(this.ref.type, this.ref.step, 0, 20, function (results) {
      this.comments = [];
      for (var i = 0; i < results.length; i++) {
        var data = results[i];
        var user = data.get('user');
        var date = data.get('date');
        var comment = data.get('comment');
        this.comments.push({
          nickname: user.get('nickname') ? user.get('nickname') : user.get('username'),
          avatarUrl: user.get('avatarUrl'),
          time: moment(date).format('YYYY-MM-DD'),
          commentContent: comment
        });
      }
      this.trigger(this);
    }.bind(this), function (error) {

    })
  },
  //FIXME 分页没做
  pullNextComment: function () {
    API.getComment(this.ref.type, this.ref.step, 0, 20, function (results) {
      for (var i = 0; i < results.length; i++) {
        var data = results[i];
        var user = data.get('user');
        var date = data.get('date');
        var comment = data.get('comment');
        this.comments.push({
          nickname: user.get('nickname') ? user.get('nickname') : user.get('username'),
          time: moment(date).format('YYYY-MM-DD'),
          commentContent: comment
        });
      }
      this.trigger(this);
    }.bind(this), function (error) {

    })
  },
  post: function (comment) {
    API.postComment(this.ref.type, this.ref.step, comment);
  },
  finishTurning: function (level) {
    API.finishTurning(this.ref.type, this.ref.step,level);
  },
  getTrendCount: function () {
    API.getTrendCount(this.ref.type, this.ref.step, function (count) {
      this.trendCount = count;
      this.trigger(this);
    }.bind(this), function (error) {
    })
  },
  pullNextTrends: function () {
    API.getTrend(this.ref.type, this.ref.step, 0, 20, function (trends) {
      this.trends = trends;
      this.trigger(this);
    }.bind(this), function (error) {
    })
  },
  setRef: function (ref) {
    this.ref = ref;
    this.trigger(this);
  },
  getInitialState: function () {
    this.comments = this.comments || [];
    this.ref = this.ref || {};
    this.trendCount = this.trendCount || 0;
    this.trends = this.trends || [];
    return {
      comments: this.comments,
      ref: this.ref,
      trendCount: this.trendCount,
      trends: this.trends,
    };
  },
  reset(){
    this.comments = [];
    this.ref = {};
    this.trendCount = 0;
    this.trends = [];
  }

});

module.exports = CommentStore;
