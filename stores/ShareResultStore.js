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
    this.stepName = this.stepName || '第四式 半俯卧撑';
    this.subStepName = this.subStepName || '初级标准';
    this.groupCount = this.groupCount || '1组';
    this.actionCount = this.actionCount || '5次';
    return {
      stepName: this.stepName,
      subStepName: this.subStepName,
      groupCount: this.groupCount,
      actionCount: this.actionCount,
    };
  },

});

module.exports = CommentStore;