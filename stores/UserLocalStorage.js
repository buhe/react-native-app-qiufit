/**
 * Created by guguyanhua on 12/22/15.
 *
 * User 本地存储
 */

class UserLocalStorage {
  serverUserToLocalUser(serverUser) {
    var user = {};
    if (serverUser.get('type') === 'wechat') {
      user.id = serverUser.id;
      user.username = serverUser.get('username');
      user.gender = serverUser.get('gender');
      user.avatarUrl = serverUser.get('avatarUrl');
      user.accessToken = serverUser.get('accessToken');
      user.openId = serverUser.get('openId');
      user.type = 'wechat';
    } else if (serverUser.get('type') === 'mob') {
      user.id = serverUser.id;
      user.phone = serverUser.get('mobilePhoneNumber');
      user.username = serverUser.get('username');
      user.type = 'mob';
    }
    return user;

  }

  /**
   *
   * @param type [mob,wechat]
   * @param user
   */
  save(user) {
    //if (user.type === 'wechat') {
      //不需要验证码
      this.setVerify(true);
    //} else if (user.type === 'mob') {
    //
    //}
    storage.save({
      key: 'user',
      rawData: user,
      expires: null,
    });
  }

  isVerify(cb) {
    storage.load({
      key: 'verify',
    }).then(cb);
  }

  setVerify(verify) {
    storage.save({
      key: 'verify',
      rawData: {
        verify: verify ? 'TRUE' : 'FALSE'
      },
      expires: null,
    });
  }

  get(cb) {
    storage.load({
      key: 'user',
    }).then(cb);
  }
}


//_convertUser(user){
//  var self = this;
//  self.user = {};
//  self.user.username = user.get('username');
//  self.user.objectId = user.id;
//  self.user.mobilePhoneNumber = user.get('mobilePhoneNumber');
//},
//_save(){
//  var self = this;
//  AsyncStorage.setItem('username', self.user.username, function (err, item) {
//    console.log(err + item);
//    AsyncStorage.getItem('username', function (err, item) {
//      console.log(item);
//    });
//  });
//  AsyncStorage.setItem('objectId', self.user.objectId, function (err, item) {
//    console.log(err + item);
//    AsyncStorage.getItem('objectId', function (err, item) {
//      console.log(item);
//    });
//  });
//  AsyncStorage.setItem('mobilePhoneNumber', self.user.mobilePhoneNumber, function (err, item) {
//    console.log(err + item);
//    AsyncStorage.getItem('mobilePhoneNumber', function (err, item) {
//      console.log(item);
//    });
//  });
//},
//_saveVerify(){
//  var self = this;
//  AsyncStorage.setItem('verify', self.user.verify, function (err, item) {
//    console.log(err + item);
//    AsyncStorage.getItem('verify', function (err, item) {
//      console.log(item);
//    });
//  });
//},
//async _get(attr){
//  try {
//    var value = await AsyncStorage.getItem(attr);
//    if (value !== null) {
//      this.user[attr] = value;
//      this.trigger(this);
//      return value;
//    } else {
//      console.log('get username null');
//    }
//  } catch (error) {
//    console.log('get username error' + error);
//    return null;
//  }
//},

export default new UserLocalStorage();
