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
    var user = new AV.User();
    user.id = userId;
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
    var user = new AV.User();
    user.id = userId;

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
    var user = new AV.User();
    user.id = userId;

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
    var user = new AV.User();
    user.id = userId;

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

  registerUser(user,success,fail){
    if(user.type === 'wechat'){
      this.registerWeChatUser(user,success,fail);
    }else if(user.type = 'mob'){
      this.registerMobUser(user,success,fail);
    }else{

    }
  }

  //注册Mob用户
  registerMobUser(mobUser, success, fail) {
    var username = mobUser.username;
    var password = mobUser.username;
    var phone = mobUser.phone;
    AV.User.logIn(username, password, {
      success: function (userServer) {
        AV.User.requestMobilePhoneVerify(phone).then(function () {
          console.log('send successful');
          if (success) {
            success(userServer);
          }
          //发送成功
        }, function (err) {
          console.log(err);
          if (fail) {
            fail(err);
          }
          //发送失败
        });
        //!--------------------------
      },
      error: function (user, error) {
        var user = new AV.User();
        user.set("username", phone);
        user.set("password", phone);
        user.setMobilePhoneNumber(phone);

        user.signUp(null, {
          success: function (userServer) {

            AV.User.requestMobilePhoneVerify(phone).then(function () {
              console.log('send successful');
              userServer.set('type','mob');
              userServer.save();
              if (success) {
                success(userServer);
              }
              //发送成功
            }, function (err) {
              console.log(err);
              if (fail) {
                fail(err);
              }
              //发送失败
            });
          },
          error: function (user, err) {
            if (fail) {
              fail(err);
            }
          }
        });

      }
    });
  }

  /**
   * 其实区别就是不发短信
   * @param wechatUser
   * @param success
   * @param fail
   */
  registerWeChatUser(wechatUser, success, fail) {
    AV.User.logIn(wechatUser.username, wechatUser.username, {
      success: function (user) {
        if (success) {
          success(user);
        }
      },
      error: function (user, error) {
        var user = new AV.User();
        user.set("username", wechatUser.username);
        user.set("password", wechatUser.username);
        //user.setMobilePhoneNumber(phone);

        user.signUp(null, {
          success: function (userServer) {
            // 注册成功，可以使用了.
            userServer.set('gender',wechatUser.gender);
            userServer.set('avatarUrl',wechatUser.avatarUrl);
            userServer.set('accessToken',wechatUser.accessToken);
            userServer.set('openId',wechatUser.openId);
            userServer.set('type','wechat');
            userServer.save();
            if (success) {
              success(userServer);
            }
          },
          error: function (user, err) {
            if (fail) {
              fail(err);
            }
          }
        });

      }
    });
  }

  requestMobilePhoneVerify(phone, success, fail) {
    AV.User.requestMobilePhoneVerify(phone).then(function () {
      console.log('send successful');
      if (success) {
        success();
      }
      //发送成功
    }, function (err) {
      console.log(err);
      if (fail) {
        fail(err);
      }
      //发送失败
    });
  }

  verifyMobilePhone(code, success, fail) {
    var self = this;
    AV.User.verifyMobilePhone(code).then(function () {
      //验证成功
      self.user.verify = 'TRUE';  //不能是boolean ,只能是字符串
      self._saveVerify();
      if (success) {
        success();
      }
    }, function (err) {
      //验证失败
      if (fail) {
        fail(err);
      }
    });
  }

}

module.exports = new API();
