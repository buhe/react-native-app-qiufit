'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/StepActionCreators');
var API = require('../api');
const VIDEO_PREFIX = 'http://7xpb7b.media1.z0.glb.clouddn.com/';
const stepsMap = {
  pushUp: [
    {
      text1: "第一式 墙壁俯卧撑",
      text2: "逐步做到 3×50 次",
      text3: "然后开始第二式",
      videoUrl: VIDEO_PREFIX+"a01.mp4"
    },
    {
      text1: "第二式 上斜俯卧撑",
      text2: "逐步做到 3×40 次",
      text3: "然后开始第三式",
      videoUrl: VIDEO_PREFIX+"a02.mp4"
    },
    {
      text1: "第三式 膝盖俯卧撑",
      text2: "逐步做到 3×30 次",
      text3: "然后开始第四式",
      videoUrl: VIDEO_PREFIX+"a03.mp4"
    }, {
      text1: "第四式 半俯卧撑",
      text2: "逐步做到 2×25 次",
      text3: "然后开始第五式",
      videoUrl: VIDEO_PREFIX+"a04.mp4"
    }, {
      text1: "第五式 标准俯卧撑",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第六式",
      videoUrl: VIDEO_PREFIX+"a05.mp4"
    },
    {
      text1: "第六式 窄距俯卧撑",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第七式",
      videoUrl: VIDEO_PREFIX+"a06.mp4"
    },
    {
      text1: "第七式 偏重俯卧撑",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第八式",
      videoUrl: VIDEO_PREFIX+"a07_empty.mp4"
    },
    {
      text1: "第八式 单臂半俯卧撑",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第九式",
      videoUrl: VIDEO_PREFIX+"a08_empty.mp4"
    },
    {
      text1: "第九式 杠杆俯卧撑",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第最终式",
      videoUrl: VIDEO_PREFIX+"a09_empty.mp4"
    },
    {
      text1: "最终式 单臂俯卧撑",
      text2: "终极耐力 1×100 次",
      videoUrl: VIDEO_PREFIX+"a10_empty.mp4"
    }
  ],
  deep: [
    {
      text1: "第一式 肩倒立深蹲",
      text2: "逐步做到 3×50 次",
      text3: "然后开始第二式",
      videoUrl: VIDEO_PREFIX+"b01.mp4"
    },
    {
      text1: "第二式 折刀深蹲",
      text2: "逐步做到 3×40 次",
      text3: "然后开始第三式",
      videoUrl: VIDEO_PREFIX+"b02.mp4"
    },
    {
      text1: "第三式 支撑深蹲",
      text2: "逐步做到 3×30 次",
      text3: "然后开始第四式",
      videoUrl: VIDEO_PREFIX+"b03.mp4"
    }, {
      text1: "第四式 半深蹲",
      text2: "逐步做到 2×50 次",
      text3: "然后开始第五式",
      videoUrl: VIDEO_PREFIX+"b04.mp4"
    }, {
      text1: "第五式 标准深蹲",
      text2: "逐步做到 2×30 次",
      text3: "然后开始第六式",
      videoUrl: VIDEO_PREFIX+"b05.mp4"
    },
    {
      text1: "第六式 窄距深蹲",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第七式",
      videoUrl: VIDEO_PREFIX+"b06.mp4"
    },
    {
      text1: "第七式 偏重深蹲",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第八式",
      videoUrl: VIDEO_PREFIX+"b07_empty.mp4"
    },
    {
      text1: "第八式 单腿半深蹲",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第九式",
      videoUrl: VIDEO_PREFIX+"b08_empty.mp4"
    },
    {
      text1: "第九式 单腿辅助深蹲",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第最终式",
      videoUrl: VIDEO_PREFIX+"b09_empty.mp4"
    },
    {
      text1: "最终式 单腿深蹲",
      text2: "终极耐力 2×50 次",
      videoUrl: VIDEO_PREFIX+"b10_empty.mp4"
    }
  ],
  pullUp: [
    {
      text1: "第一式 垂直引体",
      text2: "逐步做到 3×40 次",
      text3: "然后开始第二式",
      videoUrl: VIDEO_PREFIX+"c01.mp4"
    },
    {
      text1: "第二式 水平引体向上",
      text2: "逐步做到 3×30 次",
      text3: "然后开始第三式",
      videoUrl: VIDEO_PREFIX+"c02.mp4"
    },
    {
      text1: "第三式 折刀引体向上",
      text2: "逐步做到 3×20 次",
      text3: "然后开始第四式",
      videoUrl: VIDEO_PREFIX+"c03.mp4"
    }, {
      text1: "第四式 半引体向上",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第五式",
      videoUrl: VIDEO_PREFIX+"c04.mp4"
    }, {
      text1: "第五式 标准引体向上",
      text2: "逐步做到 2×10 次",
      text3: "然后开始第六式",
      videoUrl: VIDEO_PREFIX+"c05.mp4"
    },
    {
      text1: "第六式 窄距引体向上",
      text2: "逐步做到 2×10 次",
      text3: "然后开始第七式",
      videoUrl: VIDEO_PREFIX+"c06.mp4"
    },
    {
      text1: "第七式 偏重引体向上",
      text2: "逐步做到 2×9 次",
      text3: "然后开始第八式",
      videoUrl: VIDEO_PREFIX+"c07_empty.mp4"
    },
    {
      text1: "第八式 单臂半引体向上",
      text2: "逐步做到 2×8 次",
      text3: "然后开始第九式",
      videoUrl: VIDEO_PREFIX+"c08_empty.mp4"
    },
    {
      text1: "第九式 单臂辅助引体向上",
      text2: "逐步做到 2×7 次",
      text3: "然后开始第最终式",
      videoUrl: VIDEO_PREFIX+"c09_empty.mp4"
    },
    {
      text1: "最终式 单臂引体向上",
      text2: "终极耐力 2×7 次",
      videoUrl: VIDEO_PREFIX+"c10_empty.mp4"
    }
  ],
  leg: [
    {
      text1: "第一式 坐姿屈膝",
      text2: "逐步做到 3×40 次",
      text3: "然后开始第二式",
      videoUrl: VIDEO_PREFIX+"d01.mp4"
    },
    {
      text1: "第二式 平卧抬膝",
      text2: "逐步做到 3×35 次",
      text3: "然后开始第三式",
      videoUrl: VIDEO_PREFIX+"d02.mp4"
    },
    {
      text1: "第三式 平卧屈举腿",
      text2: "逐步做到 3×30 次",
      text3: "然后开始第四式",
      videoUrl: VIDEO_PREFIX+"d03.mp4"
    }, {
      text1: "第四式 平卧蛙举腿",
      text2: "逐步做到 2×25 次",
      text3: "然后开始第五式",
      videoUrl: VIDEO_PREFIX+"d04.mp4"
    }, {
      text1: "第五式 平卧直举腿",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第六式",
      videoUrl: VIDEO_PREFIX+"d05.mp4"
    },
    {
      text1: "第六式 悬垂举腿",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第七式",
      videoUrl: VIDEO_PREFIX+"d06.mp4"
    },
    {
      text1: "第七式 悬垂屈举腿",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第八式",
      videoUrl: VIDEO_PREFIX+"d07_empty.mp4"
    },
    {
      text1: "第八式 悬垂蛙举腿",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第九式",
      videoUrl: VIDEO_PREFIX+"d08_empty.mp4"
    },
    {
      text1: "第九式 悬垂半举腿",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第最终式",
      videoUrl: VIDEO_PREFIX+"d09_empty.mp4"
    },
    {
      text1: "最终式 悬垂直举腿",
      text2: "终极耐力 2×30 次",
      videoUrl: VIDEO_PREFIX+"d10_empty.mp4"
    }
  ],
  bridge: [
    {
      text1: "第一式 短桥",
      text2: "逐步做到 3×50 次",
      text3: "然后开始第二式",
      videoUrl: VIDEO_PREFIX+"e01.mp4"
    },
    {
      text1: "第二式 直桥",
      text2: "逐步做到 3×40 次",
      text3: "然后开始第三式",
      videoUrl: VIDEO_PREFIX+"e02.mp4"
    },
    {
      text1: "第三式 高低桥",
      text2: "逐步做到 3×30 次",
      text3: "然后开始第四式",
      videoUrl: VIDEO_PREFIX+"e03.mp4"
    }, {
      text1: "第四式 顶桥",
      text2: "逐步做到 2×25 次",
      text3: "然后开始第五式",
      videoUrl: VIDEO_PREFIX+"e04.mp4"
    }, {
      text1: "第五式 半桥",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第六式",
      videoUrl: VIDEO_PREFIX+"e05.mp4"
    },
    {
      text1: "第六式 标准桥",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第七式",
      videoUrl: VIDEO_PREFIX+"e06.mp4"
    },
    {
      text1: "第七式 下行桥",
      text2: "逐步做到 2×10 次",
      text3: "然后开始第八式",
      videoUrl: VIDEO_PREFIX+"e07_empty.mp4"
    },
    {
      text1: "第八式 上行桥",
      text2: "逐步做到 2×8 次",
      text3: "然后开始第九式",
      videoUrl: VIDEO_PREFIX+"e08_empty.mp4"
    },
    {
      text1: "第九式 合桥",
      text2: "逐步做到 2×6 次",
      text3: "然后开始第最终式",
      videoUrl: VIDEO_PREFIX+"e09_empty.mp4"
    },
    {
      text1: "最终式 铁板桥",
      text2: "终极耐力 2×30 次",
      videoUrl: VIDEO_PREFIX+"e10_empty.mp4"
    }
  ],
  handstand: [
    {
      text1: "第一式 靠墙顶立",
      text2: "逐步做到 2分钟",
      text3: "然后开始第二式"
    },
    {
      text1: "第二式 乌鸦式",
      text2: "逐步做到 1分钟",
      text3: "然后开始第三式"
    },
    {
      text1: "第三式 靠墙倒立",
      text2: "逐步做到 2分钟",
      text3: "然后开始第四式"
    }, {
      text1: "第四式 半倒立撑",
      text2: "逐步做到 2×20 次",
      text3: "然后开始第五式"
    }, {
      text1: "第五式 标准倒立撑",
      text2: "逐步做到 2×15 次",
      text3: "然后开始第六式"
    },
    {
      text1: "第六式 窄距倒立撑",
      text2: "逐步做到 2×12 次",
      text3: "然后开始第七式"
    },
    {
      text1: "第七式 偏重倒立撑",
      text2: "逐步做到 2×10 次",
      text3: "然后开始第八式"
    },
    {
      text1: "第八式 单臂半倒立撑",
      text2: "逐步做到 2×8 次",
      text3: "然后开始第九式"
    },
    {
      text1: "第九式 杠杆倒立撑",
      text2: "逐步做到 2×6 次",
      text3: "然后开始第最终式"
    },
    {
      text1: "最终式 单臂倒立撑",
      text2: "终极耐力 2×5 次",
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
  sync: function () {
    API.pullTurningStep(function (data) {
      this.data = data;
    }.bind(this), function (err) {
      console.log(err);
    }.bind(this));
  },
  fetchByType: function () {
    this.steps = stepsMap[this.typeName];
    this.stepName = stepsNameMap[this.typeName];
    var selected = this.data[this.typeName];
    if(selected){
      for (var i = 0; i < selected.length; i++) {
        var stepIndex = selected[i];
        this.steps[stepIndex].selected = true;
      }
    }
    this.trigger(this);
  },
  setTypeName:function(typeName){
    this.typeName = typeName;
  },
  getInitialState: function () {
    this.steps = this.steps || [];
    this.stepName = this.stepName || '';
    this.data = this.data || {};
    this.typeName = this.typeName || '';
    return {
      steps: this.steps,
      stepName: this.stepName,
      data: this.data,
      typeName: this.typeName
    };
  },
  reset(){
    this.steps = [];
    this.stepName = '';
    this.data = {},
    this.typeName = '';
  }

});

module.exports = StepStore;
