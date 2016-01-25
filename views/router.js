/**
 * Created by guguyanhua on 11/3/15.
 */
var React = require('react-native');
var {
    View,
    Text
    } = React;
let YourRouter = {
  getInfo(){
    return {
      getSceneClass(){
        return require('./video/info');
      }
    }
  },
  getVerify(){
    return {
      getSceneClass(){
        return require('./login/phone/verify');
      }
    }
  },
  getLogin(){
    return {
      getSceneClass(){
        return require('./login/phone');
      }
    }
  },
  getEmailLogin(){
    return {
      getSceneClass(){
        return require('./login/email');
      }
    }
  },
  getEmailRegister(){
    return {
      getSceneClass(){
        return require('./login/email/register');
      }
    }
  },
  getWelcome(){
    return {
      getSceneClass(){
        return require('./welcome');
      }
    }
  },
  getResult(){
    return {
      getSceneClass(){
        return require('./video/result');
      }
    }
  },
  getPost(){
    return {
      getSceneClass(){
        return require('./video/comment');
      }
    }
  },
  getTrend(){
    return {
      getSceneClass(){
        return require('./video/trend');
      }
    }
  },
  getVideo() {
    return {
      getSceneClass() {
        return require('./video');
      },

    };
  },
  getProfile() {
    return {
      getSceneClass() {
        return require('./profile');
      },

    };
  },
  getTypeList() {
    return {
      getSceneClass() {
        return require('./typelist');
      },
    };
  },
  getStepList() {
    return {
      getSceneClass() {
        return require('./steplist');
      },
    };
  },

};

module.exports = YourRouter;
