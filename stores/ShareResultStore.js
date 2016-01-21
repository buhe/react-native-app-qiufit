/**
 * Created by guguyanhua on 12/29/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/ShareResultActionCreators');
var API = require('../api');
import moment from 'moment';
import I18nView from '../views/I18nView';
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
    var splitChar;
    if(I18nView.localeZh()){ //国语
      splitChar = ', ';
    }else{
      splitChar = ' set ';
    }
    var details = subStepDetails.split(splitChar);
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