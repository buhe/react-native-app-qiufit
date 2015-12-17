'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/StepActionCreators');
import API from '../api';
const stepsMap = {
  pushUp: [
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }
  ],
  deep: [
    {
      text1: "第二式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第二式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第二式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第二式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第二式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第二式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }
  ],
  pullUp: [
    {
      text1: "第三式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第三式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第三式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第三式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第三式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第三式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }
  ],
  leg: [
    {
      text1: "第四式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第四式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第四式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第四式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第四式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第四式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }
  ],
  bridge: [
    {
      text1: "第五式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第五式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第五式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第五式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第五式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第五式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }
  ],
  handstand: [
    {
      text1: "第六式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第六式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第六式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第六式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }, {
      text1: "第六式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    },
    {
      text1: "第六式 墙壁俯卧撑",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第二式"
    }
  ],
};


const stepsNameMap = {
  pushUp: '俯卧撑',
  deep: '深蹲',
  pullUp: '引体向上',
  leg: '举腿',
  bridge: '桥',
  handstand: '倒立撑',
};

var StepStore = Reflux.createStore({
  listenables: Actions,
  fetchByType: function (type) {
    var self = this;
    this.steps = stepsMap[type];
    this.stepName = stepsNameMap[type];
    API.pullTurningStep(function (data) {
      var selected = data[type];
      for(var i = 0; i < selected.length; i++){
        var stepIndex = selected[i];
        self.steps[stepIndex].selected = true;
      }
      self.trigger(this);
    }, function (err) {
      console.log(err);
      this.trigger(this);
    });

  },
  getInitialState: function () {
    this.steps = this.steps || [];
    this.stepName = this.stepName || '';
    return {
      steps: this.steps,
      stepName: this.stepName
    };
  },
  reset(){
    this.steps = [];
    this.stepName = '';
  }

});

module.exports = StepStore;
