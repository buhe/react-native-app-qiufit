'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/StepActionCreators');
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
    }
  ],
  deep:[
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

var StepStore = Reflux.createStore({
  listenables: Actions,
  fetchByType: function (type) {
    this.steps = stepsMap[type];
    this.trigger(this);
  },
  getInitialState: function () {
    this.steps = this.steps || [];
    return {
      steps: this.steps
    };
  },
  reset(){
    this.steps = [];
  }

});

module.exports = StepStore;
