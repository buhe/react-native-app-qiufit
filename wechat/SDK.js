/**
 * Created by guguyanhua on 12/22/15.
 */
import React, {
    AlertIOS,
} from 'react-native';
import request from 'superagent';
var prefix = require('superagent-prefix')('https://api.weixin.qq.com/sns');
const ID = 'wx78abe553b44618ff';
const SECRET = '6a7e35146bd280b5952740ec9933814d';
class WeChat {
  getAccessToken(code, success, fail) {
    request
        .get('/oauth2/access_token')
        .query({appid: ID})
        .query({secret: SECRET})
        .query({code: code})
        .query({grant_type: 'authorization_code'})
        .use(prefix)
        .end(function (err, res) {

          res.body = res.body || JSON.parse(res.text);
          //AlertIOS.alert(JSON.stringify(res.body));
          if (err && fail) {
            fail(err);
          } else if (fail && res.status !== 200) {
            fail({code: 401, msg: '不是200'});
          } else if (success) {
            //TODO saveToken and openId

            success(res.body);
          }
        });
  }

  getUserInfo(openId,accessToken,success,fail){
    request.get('/userinfo')
        .query({access_token: accessToken})
        .query({openid: openId})
        .use(prefix)
        .end(function (err, res) {
          res.body = res.body || JSON.parse(res.text);
          //AlertIOS.alert(JSON.stringify(res.body));
          if (err && fail) {
            fail(err);
          } else if (fail && res.status !== 200) {
            fail({code: 401, msg: '不是200'});
          } else if (success) {
            success(res.body);
          }
        });
  }
}
var wechat = new WeChat();
wechat.APPID = ID;
wechat.SECRET = SECRET;

module.exports = wechat;
