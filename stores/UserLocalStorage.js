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
    }else if(serverUser.get('type') === 'fb') {
      user.id = serverUser.id;
      user.username = serverUser.get('username');
      user.gender = serverUser.get('gender');
      //user.avatarUrl = serverUser.get('avatarUrl');
      user.accessToken = serverUser.get('accessToken');
      user.openId = serverUser.get('openId');
      user.type = 'fb';
    } else if (serverUser.get('type') === 'email') {
      user.id = serverUser.id;
      user.email = serverUser.get('email');
      user.username = serverUser.get('username');
      user.type = 'email';
    }
    return user;

  }

  /**
   *
   * @param type [mob,wechat]
   * @param user
   */
  save(user) {
    storage.save({
      key: 'user',
      rawData: user,
      expires: null,
    });
  }

  get(cb) {
    storage.load({
      key: 'user',
    }).then(cb);
  }

  getSkip(cb){
    storage.load({
      key: 'skip',
    }).then(cb);
  }

  skip(){
    storage.save({
      key: 'skip',
      rawData: {skip:true},
      expires: null,
    });
  }
}

export default new UserLocalStorage();
