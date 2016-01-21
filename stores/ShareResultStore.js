/**
 * Created by guguyanhua on 12/29/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/ShareResultActionCreators');
var API = require('../api');
import moment from 'moment';
//var _ = require('lodash');


var CommentStore = Reflux.createStore({
  listenables: Actions,
  /**
   *
   * @param stepName
   * @param subStepName
   * @param subStepDetails
   */
  setShareResult: function (stepName,subStepName,subStepDetails) {
    this.stepName = stepName;
    this.subStepName = subStepName;
    var details = subStepDetails.split(', ');
    this.groupCount = details[0];
    this.actionCount = details[1];
    this.trigger(this);
  },

  getInitialState: function () {
    this.stepName = this.stepName || '';
    this.subStepName = this.subStepName || '';
    this.groupCount = this.groupCount || '';
    this.actionCount = this.actionCount || '';
    return {
      stepName: this.stepName,
      subStepName: this.subStepName,
      groupCount: this.groupCount,
      actionCount: this.actionCount,
    };
  },

});

module.exports = CommentStore;