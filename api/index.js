/**
 * Created by guguyanhua on 12/11/15.
 */
var AV = require('avoscloud-sdk');
AV.initialize('OQYNgj8ffRah8qaSqaQjSgil-gzGzoHsz', 'CH8e9IdQw3FjIqJ14p2kJee2');
//AV.Promise.setPromisesAPlusCompliant(true);

var CheckIn = AV.Object.extend("CheckIn");
var Profile = AV.Object.extend("Profile");
var Comment = AV.Object.extend("Comment");
import UserStore from '../stores/UserStore';
import moment from 'moment';

class API {

  /**
   * 完成训练
   */
  finishTurning(type, step) {
    //var objectId = UserStore.user.objectId;
    var objectId = '566e652c60b25b0437222a51';
    var user = new AV.User();
    //user.id = objectId;
    user.id = objectId;
    step = parseInt(step);
    var date = moment().format('YYYY-MM-DD');
    //1. 记录打卡信息
    var query1 = new AV.Query(CheckIn);
    query1.equalTo('user', user);
    query1.equalTo('date', date);
    query1.find({
      success: function (results) {
        if (results.length > 0) {
          var checkIn = results[0];
          checkIn.increment("count"); //完成数量+1
          checkIn.save();
        } else {
          var checkIn = new CheckIn();
          checkIn.set('user', user);
          checkIn.set('date', date);
          checkIn.set('count', 1);
          checkIn.save();
        }
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        var checkIn = new CheckIn();
        checkIn.set('user', user);
        checkIn.set('date', date);
        checkIn.set('count', 1);
        checkIn.save();
      }
    });
    //2. 记录完成了哪个阶段
    var query = new AV.Query(Profile);
    query.equalTo('user', user);
    query.equalTo('type', type);
    query.equalTo('step', step);
    query.find({
      success: function (results) {
        if (results.length > 0) {
          var profile = results[0];
          profile.increment("count"); //完成数量+1
          profile.save();
        } else {
          var profile = new Profile();
          profile.set('user', user);
          profile.set('type', type);
          profile.set('step', step);
          profile.set('count', 1);
          profile.save();
        }
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        var profile = new Profile();
        profile.set('user', user);
        profile.set('type', type);
        profile.set('step', step);
        profile.set('count', 1);
        profile.save();
      }
    });
  }

  /**
   * 获取打卡信息
   * @param user
   */
  pullTurningDate(success, fail) {
    //var objectId = UserStore.user.objectId;
    var objectId = '566e652c60b25b0437222a51';

    var user = new AV.User();
    //user.id = objectId;
    user.id = objectId;

    var query = new AV.Query(CheckIn);
    query.equalTo('user', user);
    query.find({
      success: function (results) {
        var result = {};
        for (var i = 0; i < results.length; i++) {
          var checkIn = results[i];
          var date = checkIn.get('date');
          var key = 'unknow';
          try {
            var keys = date.split('-');
            key = keys[0] + keys[1];
          } catch (e) {
          }
          if (result[key]) {
            result[key].push(date);
          } else {
            if (key !== 'unknow') {
              result[key] = [];
              result[key].push(date);
            }
          }
        }
        //merge
        success(result);
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        fail(error);
      }
    });
  }

  /**
   * 获取类型
   * @param user
   */
  pullTurningStep(success, fail) {
    //var objectId = UserStore.user.objectId;
    var objectId = '566e652c60b25b0437222a51';
    var user = new AV.User();
    //user.id = objectId;
    user.id = objectId

    var query = new AV.Query(Profile);
    query.equalTo('user', user);
    query.find({
      success: function (results) {
        var result = {};
        for (var i = 0; i < results.length; i++) {
          var data = results[i];
          var type = data.get('type');
          var step = data.get('step');
          if (result[type]) {
            result[type].push(step);
          } else {
            result[type] = [];
            result[type].push(step);
          }
        }
        //merge
        success(result);
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        fail(error);
      }
    });
  }

  /**
   *
   * @param type 类型
   * @param step 第几步
   * @param success
   * @param fail
   */
  postComment(type, step, commentContent, success, fail) {
    //var objectId = UserStore.user.objectId;
    var objectId = '566e652c60b25b0437222a51';

    var user = new AV.User();
    user.id = objectId;
    //当前时间
    var date = Date.now();
    var comment = new Comment();
    comment.set('user', user);
    comment.set('date', date);
    comment.set('type', type);
    comment.set('step', step);
    comment.set('comment', commentContent);
    comment.save();
  }

  getComment(type, step, start, size, success, fail) {

    var query = new AV.Query(Comment);
    query.equalTo('type', type);
    query.equalTo('step', step);
    query.include("user");
    query.skip(start ? start : 0);
    query.limit(size ? size : 10);
    query.descending("date"); //时间反排序
    query.find({
      success: function (results) {
        //merge
        if (success) {
          success(results);
        }

      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        if (fail) {
          fail(error);
        }
      }
    });
  }

  getTrend(type, step, start, size, success, fail) {

    var query = new AV.Query(Profile);
    query.equalTo('type', type);
    query.equalTo('step', step);
    query.include("user");
    query.skip(start ? start : 0);
    query.limit(size ? size : 10);
    query.descending("date"); //时间反排序
    query.find({
      success: function (results) {
        var trends = [];
        for (var i = 0; i < results.length; i++) {
          var data = results[i];
          var nickname = data.get('user').get('username');
          var date = data.get('date');
          trends.push({
            nickname: nickname,
            date: moment(date).format('YYYY-MM-DD')
          });
        }
        //merge
        if (success) {
          success(trends);
        }
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        if (fail) {
          fail(error);
        }
      }
    });
  }

  getTrendCount(type, step, success, fail) {

    var query = new AV.Query(Profile);
    query.equalTo('type', type);
    query.equalTo('step', step);
    query.count({
      success: function (count) {
        if (success) {
          success(count);
        }
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        if (fail) {
          fail(error);
        }
      }
    });
  }

}

module.exports = new API();
