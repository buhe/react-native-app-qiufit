'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/StepActionCreators');
var API = require('../api');
const VIDEO_PREFIX = 'http://7xpb7b.media1.z0.glb.clouddn.com/';
const INFO_IMAGE_PREFIX = 'http://7xp0wd.com2.z0.glb.qiniucdn.com/';
var I18n = require('react-native-i18n');
function t(key) {
  return I18n.t(key);
}
const stepsMap = {
  pushUp: [
    {
      text1: t('_1_1'),
      text2: t('goal') + "3×50",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a01.mp4",
      subStep: [
        t('_1s10'),//1 set of 5
        t('_1s25'),
        t('_3s50'),
      ],
      infoImage: require('../images/a1.jpg')
    },
    {
      text1: t('_1_2'),
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s40'),
      ],
      infoImage: require('../images/a2.jpg')
    },
    {
      text1: t('_1_3'),
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a03.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s30'),
      ],
      infoImage: require('../images/a3.jpg')
    }, {
      text1: t('_1_4'),
      text2: t('goal') + "2×25",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a04.mp4",
      subStep: [
        t('_1s8'),
        t('_2s12'),
        t('_1s25'),
      ],
      infoImage: require('../images/a4.jpg')
    }, {
      text1: t('_1_5'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a05.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      infoImage: require('../images/a5.jpg')
    },
    {
      text1: t('_1_6'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a06.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      infoImage: require('../images/a6.jpg')
    },
    {
      text1: t('_1_7'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a07_empty.mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_3s20') + t('side'),
      ],
      infoImage: require('../images/a7.jpg')
    },
    {
      text1: t('_1_8'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a08_empty.mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_2s20') + t('side'),
      ],
      infoImage: require('../images/a8.jpg')
    },
    {
      text1: t('_1_9'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a09_empty.mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_2s20') + t('side'),
      ],
      infoImage: require('../images/a9.jpg')
    },
    {
      text1: t('_1_10'),
      text2: "终极耐力 1×100",
      videoUrl: VIDEO_PREFIX + "a10_empty.mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s20') + t('side'),
        t('_1s100') + t('side'),
      ],
      infoImage: require('../images/a10.jpg')
    }
  ],
  deep: [
    {
      text1: t('_2_1'),
      text2: t('goal') + "3×50",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b01.mp4",
      subStep: [
        t('_1s10'),
        t('_1s25'),
        t('_3s50'),
      ],
      infoImage: require('../images/b1.jpg')
    },
    {
      text1: t('_2_2'),
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s40'),
      ],
      infoImage: require('../images/b2.jpg')
    },
    {
      text1: t('_2_3'),
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b03.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s30'),
      ],
      infoImage: require('../images/b3.jpg')
    }, {
      text1: t('_2_4'),
      text2: t('goal') + "2×50",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b04.mp4",
      subStep: [
        t('_1s8'),
        t('_2s35'),
        t('_2s50'),
      ],
      infoImage: require('../images/b4.jpg')
    }, {
      text1: t('_2_5'),
      text2: t('goal') + "2×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b05.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_3s30'),
      ],
      infoImage: require('../images/b5.jpg')
    },
    {
      text1: t('_2_6'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b06.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      infoImage: require('../images/b6.jpg')
    },
    {
      text1: t('_2_7'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b07_empty.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_3s20'),
      ],
      infoImage: require('../images/b7.jpg')
    },
    {
      text1: t('_2_8'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b08_empty.mp4",
      subStep: [
        t('_1s10'),
        t('_2s10'),
        t('_3s10'),
      ],
      infoImage: require('../images/b8.jpg')
    },
    {
      text1: t('_2_9'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b09_empty.mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_2s20') + t('side'),
      ],
      infoImage: require('../images/b9.jpg')
    },
    {
      text1: t('_2_10'),
      text2: "终极耐力 2×50",
      videoUrl: VIDEO_PREFIX + "b10_empty.mp4",
      subStep: [
        t('_1s10') + t('side'),
        t('_2s10') + t('side'),
        t('_2s50') + t('side'),
      ],
      infoImage: require('../images/b10.jpg')
    }
  ],
  pullUp: [
    {
      text1: "第一式 垂直引体",
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c01.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s40'),
      ],
      infoImage: require('../images/c1.jpg')
    },
    {
      text1: "第二式 水平引体向上",
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s30'),
      ],
      infoImage: require('../images/c2.jpg')
    },
    {
      text1: "第三式 折刀引体向上",
      text2: t('goal') + "3×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c03.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s20'),
      ],
      infoImage: require('../images/c3.jpg')
    }, {
      text1: "第四式 半引体向上",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c04.mp4",
      subStep: [
        t('_1s8'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: require('../images/c4.jpg')
    }, {
      text1: "第五式 标准引体向上",
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c05.mp4",
      subStep: [
        t('_1s5'),
        t('_2s8'),
        t('_2s10'),
      ],
      infoImage: require('../images/c5.jpg')
    },
    {
      text1: "第六式 窄距引体向上",
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c06.mp4",
      subStep: [
        t('_1s5'),
        t('_2s8'),
        t('_2s10'),
      ],
      infoImage: require('../images/c6.jpg')
    },
    {
      text1: "第七式 偏重引体向上",
      text2: t('goal') + "2×9",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c07_empty.mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s7') + t('side'),
        t('_2s9') + t('side'),
      ],
      infoImage: require('../images/c7.jpg')
    },
    {
      text1: "第八式 单臂半引体向上",
      text2: t('goal') + "2×8",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c08_empty.mp4",
      subStep: [
        t('_1s4') + t('side'),
        t('_1s8') + t('side'),
        t('_2s8') + t('side'),
      ],
      infoImage: require('../images/c8.jpg')
    },
    {
      text1: "第九式 单臂辅助引体向上",
      text2: t('goal') + "2×7",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c09_empty.mp4",
      subStep: [
        t('_1s3') + t('side'),
        t('_2s5') + t('side'),
        t('_2s7') + t('side'),
      ],
      infoImage: require('../images/c9.jpg')
    },
    {
      text1: "最终式 单臂引体向上",
      text2: "终极耐力 2×7",
      videoUrl: VIDEO_PREFIX + "c10_empty.mp4",
      subStep: [
        t('_1s1') + t('side'),
        t('_2s3') + t('side'),
        t('_2s7') + t('side'),
      ],
      infoImage: require('../images/c10.jpg')
    }
  ],
  leg: [
    {
      text1: "第一式 坐姿屈膝",
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d01.mp4",
      subStep: [
        t('_1s10'),
        t('_1s25'),
        t('_4s40'),
      ],
      infoImage: require('../images/d1.jpg')
    },
    {
      text1: "第二式 平卧抬膝",
      text2: t('goal') + "3×35",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s35'),
      ],
      infoImage: require('../images/d2.jpg')
    },
    {
      text1: "第三式 平卧屈举腿",
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d03.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s30'),
      ],
      infoImage: require('../images/d3.jpg')
    }, {
      text1: "第四式 平卧蛙举腿",
      text2: t('goal') + "2×25",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d04.mp4",
      subStep: [
        t('_1s8'),
        t('_2s15'),
        t('_3s25'),
      ],
      infoImage: require('../images/d4.jpg')
    }, {
      text1: "第五式 平卧直举腿",
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d05.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      infoImage: require('../images/d5.jpg')
    },
    {
      text1: "第六式 悬垂举腿",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d06.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: require('../images/d6.jpg')
    },
    {
      text1: "第七式 悬垂屈举腿",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d07_empty.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: require('../images/d7.jpg')
    },
    {
      text1: "第八式 悬垂蛙举腿",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d08_empty.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: require('../images/d8.jpg')
    },
    {
      text1: "第九式 悬垂半举腿",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d09_empty.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: require('../images/d9.jpg')
    },
    {
      text1: "最终式 悬垂直举腿",
      text2: "终极耐力 2×30",
      videoUrl: VIDEO_PREFIX + "d10_empty.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s30'),
      ],
      infoImage: require('../images/d10.jpg')
    }
  ],
  bridge: [
    {
      text1: "第一式 短桥",
      text2: t('goal') + "3×50",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e01.mp4",
      subStep: [
        t('_1s10'),
        t('_1s25'),
        t('_3s50'),
      ],
      infoImage: require('../images/e1.jpg')
    },
    {
      text1: "第二式 直桥",
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s40'),
      ],
      infoImage: require('../images/e2.jpg')
    },
    {
      text1: "第三式 高低桥",
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e03.mp4",
      subStep: [
        t('_1s8'),
        t('_2s15'),
        t('_3s30'),
      ],
      infoImage: require('../images/e3.jpg')
    }, {
      text1: "第四式 顶桥",
      text2: t('goal') + "2×25",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e04.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s25'),
      ],
      infoImage: require('../images/e4.jpg')
    }, {
      text1: "第五式 半桥",
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e05.mp4",
      subStep: [
        t('_1s8'),
        t('_2s15'),
        t('_2s20'),
      ],
      infoImage: require('../images/e5.jpg')
    },
    {
      text1: "第六式 标准桥",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e06.mp4",
      subStep: [
        t('_1s6'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: require('../images/e6.jpg')
    },
    {
      text1: "第七式 下行桥",
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e07_empty.mp4",
      subStep: [
        t('_1s3'),
        t('_2s6'),
        t('_2s10'),
      ],
      infoImage: require('../images/e7.jpg')
    },
    {
      text1: "第八式 上行桥",
      text2: t('goal') + "2×8",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e08_empty.mp4",
      subStep: [
        t('_1s2'),
        t('_2s4'),
        t('_2s8'),
      ],
      infoImage: require('../images/e8.jpg')
    },
    {
      text1: "第九式 合桥",
      text2: t('goal') + "2×6",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e09_empty.mp4",
      subStep: [
        t('_1s1'),
        t('_2s3'),
        t('_2s6'),
      ],
      infoImage: require('../images/e9.jpg')
    },
    {
      text1: "最终式 铁板桥",
      text2: "终极耐力 2×30",
      videoUrl: VIDEO_PREFIX + "e10_empty.mp4",
      subStep: [
        t('_1s1'),
        t('_2s3'),
        t('_2s30'),
      ],
      infoImage: require('../images/e10.jpg')
    }
  ],
  handstand: [
    {
      text1: "第一式 靠墙顶立",
      text2: t('goal') + "2分钟",
      text3: t('next_step'),
      subStep: [
        t('_30s'),
        t('_1m'),
        t('_2m'),
      ],
      videoUrl: "",
      infoImage: require('../images/f1.jpg')
    },
    {
      text1: "第二式 乌鸦式",
      text2: t('goal') + "1分钟",
      text3: t('next_step'),
      subStep: [
        t('_10s'),
        t('_30s'),
        t('_1m'),
      ],
      infoImage: require('../images/f2.jpg')
    },
    {
      text1: "第三式 靠墙倒立",
      text2: t('goal') + "2分钟",
      text3: t('next_step'),
      subStep: [
        t('_10s'),
        t('_1m'),
        t('_2m'),
      ],
      videoUrl: "",
      infoImage: require('../images/f3.jpg')
    }, {
      text1: "第四式 半倒立撑",
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      videoUrl: "",
      infoImage: require('../images/f4.jpg')
    }, {
      text1: "第五式 标准倒立撑",
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      videoUrl: "",
      infoImage: require('../images/f5.jpg')
    },
    {
      text1: "第六式 窄距倒立撑",
      text2: t('goal') + "2×12",
      text3: t('next_step'),
      subStep: [
        t('_1s5'),
        t('_2s9'),
        t('_2s12'),
      ],
      videoUrl: "",
      infoImage: require('../images/f6.jpg')
    },
    {
      text1: "第七式 偏重倒立撑",
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      subStep: [
        t('_1s5') + t('side'),
        t('_2s8') + t('side'),
        t('_2s10') + t('side'),
      ],
      videoUrl: "",
      infoImage: require('../images/f7.jpg')
    },
    {
      text1: "第八式 单臂半倒立撑",
      text2: t('goal') + "2×8",
      text3: t('next_step'),
      subStep: [
        t('_1s4') + t('side'),
        t('_2s6') + t('side'),
        t('_2s8') + t('side'),
      ],
      videoUrl: "",
      infoImage: require('../images/f8.jpg')
    },
    {
      text1: "第九式 杠杆倒立撑",
      text2: t('goal') + "2×6",
      text3: t('next_step'),
      subStep: [
        t('_1s3') + t('side'),
        t('_2s4') + t('side'),
        t('_2s6') + t('side'),
      ],
      videoUrl: "",
      infoImage: require('../images/f9.jpg')
    },
    {
      text1: "最终式 单臂倒立撑",
      text2: "终极耐力 2×5",
      subStep: [
        t('_1s1') + t('side'),
        t('_2s2') + t('side'),
        t('_2s5') + t('side'),
      ],
      videoUrl: "",
      infoImage: require('../images/f10.jpg')
    }
  ],
};


const stepsNameMap = {
  pushUp: I18n.t('pushUp'),
  deep: I18n.t('deep'),
  pullUp: I18n.t('pullUp'),
  leg: I18n.t('leg'),
  bridge: I18n.t('bridge'),
  handstand: I18n.t('handstand'),
};

var StepStore = Reflux.createStore({
  listenables: Actions,
  sync: function () {
    API.pullTurningStep(function (data) {
      this.data = data;
      this.trigger(this);
    }.bind(this), function (err) {
      console.log(err);
    }.bind(this));
  },
  fetchByType: function () {
    this.steps = stepsMap[this.typeName];
    this.stepName = stepsNameMap[this.typeName];
    if (this.data) {
      var selected = this.data[this.typeName];
      if (selected) {
        for (var i = 0; i < selected.length; i++) {
          var stepIndex = selected[i].get('step');
          this.steps[stepIndex].selected = true;
        }
      }
    }

    this.trigger(this);
  },
  setTypeName: function (typeName) {
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
StepStore.stepNameMap = stepsNameMap;
StepStore.stepsMap = stepsMap;
module.exports = StepStore;
