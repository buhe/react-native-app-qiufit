'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/StepActionCreators');
var API = require('../api');
const INFO_IMAGE_PREFIX = 'http://7xp0wd.com2.z0.glb.qiniucdn.com/';
var I18n = require('react-native-i18n');
var I18nView = require('../views/I18nView');
var ImageHolder;
var VIDEO_PREFIX;
if (I18nView.localeZh()) {
  ImageHolder = require('../images/zh');
  VIDEO_PREFIX = 'http://7xpb7b.media1.z0.glb.clouddn.com/';
} else {
  ImageHolder = require('../images/en');
  VIDEO_PREFIX = 'http://s3-us-west-2.amazonaws.com/pf-video/'; //en use aws s3
}

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
      infoImage: ImageHolder.a1
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
      infoImage: ImageHolder.a2
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
      infoImage: ImageHolder.a3
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
      infoImage: ImageHolder.a4
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
      infoImage: ImageHolder.a5
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
      infoImage: ImageHolder.a6
    },
    {
      text1: t('_1_7'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a07" + (I18nView.localeZh() ? "" + (I18nView.localeZh() ? "_empty" : "") + "" : "") + ".mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_3s20') + t('side'),
      ],
      infoImage: ImageHolder.a7
    },
    {
      text1: t('_1_8'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a08" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_2s20') + t('side'),
      ],
      infoImage: ImageHolder.a8
    },
    {
      text1: t('_1_9'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "a09" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_2s20') + t('side'),
      ],
      infoImage: ImageHolder.a9
    },
    {
      text1: t('_1_10'),
      text2: t('final_goal') + "1×100",
      videoUrl: VIDEO_PREFIX + "a10" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s20') + t('side'),
        t('_1s100') + t('side'),
      ],
      infoImage: ImageHolder.a10
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
      infoImage: ImageHolder.b1
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
      infoImage: ImageHolder.b2
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
      infoImage: ImageHolder.b3
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
      infoImage: ImageHolder.b4
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
      infoImage: ImageHolder.b5
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
      infoImage: ImageHolder.b6
    },
    {
      text1: t('_2_7'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b07" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_3s20'),
      ],
      infoImage: ImageHolder.b7
    },
    {
      text1: t('_2_8'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b08" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s10'),
        t('_2s10'),
        t('_3s10'),
      ],
      infoImage: ImageHolder.b8
    },
    {
      text1: t('_2_9'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "b09" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s10') + t('side'),
        t('_2s20') + t('side'),
      ],
      infoImage: ImageHolder.b9
    },
    {
      text1: t('_2_10'),
      text2: t('final_goal') + "2×50",
      videoUrl: VIDEO_PREFIX + "b10" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s10') + t('side'),
        t('_2s10') + t('side'),
        t('_2s50') + t('side'),
      ],
      infoImage: ImageHolder.b10
    }
  ],
  pullUp: [
    {
      text1: t('_3_1'),
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c01.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s40'),
      ],
      infoImage: ImageHolder.c1
    },
    {
      text1: t('_3_2'),
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s30'),
      ],
      infoImage: ImageHolder.c2
    },
    {
      text1: t('_3_3'),
      text2: t('goal') + "3×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c03.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s20'),
      ],
      infoImage: ImageHolder.c3
    }, {
      text1: t('_3_4'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c04.mp4",
      subStep: [
        t('_1s8'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: ImageHolder.c4
    }, {
      text1: t('_3_5'),
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c05.mp4",
      subStep: [
        t('_1s5'),
        t('_2s8'),
        t('_2s10'),
      ],
      infoImage: ImageHolder.c5
    },
    {
      text1: t('_3_6'),
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c06.mp4",
      subStep: [
        t('_1s5'),
        t('_2s8'),
        t('_2s10'),
      ],
      infoImage: ImageHolder.c6
    },
    {
      text1: t('_3_7'),
      text2: t('goal') + "2×9",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c07" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5') + t('side'),
        t('_2s7') + t('side'),
        t('_2s9') + t('side'),
      ],
      infoImage: ImageHolder.c7
    },
    {
      text1: t('_3_8'),
      text2: t('goal') + "2×8",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c08" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s4') + t('side'),
        t('_1s8') + t('side'),
        t('_2s8') + t('side'),
      ],
      infoImage: ImageHolder.c8
    },
    {
      text1: t('_3_9'),
      text2: t('goal') + "2×7",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "c09" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s3') + t('side'),
        t('_2s5') + t('side'),
        t('_2s7') + t('side'),
      ],
      infoImage: ImageHolder.c9
    },
    {
      text1: t('_3_10'),
      text2: t('final_goal') + "2×7",
      videoUrl: VIDEO_PREFIX + "c10" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s1') + t('side'),
        t('_2s3') + t('side'),
        t('_2s7') + t('side'),
      ],
      infoImage: ImageHolder.c10
    }
  ],
  leg: [
    {
      text1: t('_4_1'),
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d01.mp4",
      subStep: [
        t('_1s10'),
        t('_1s25'),
        t('_4s40'),
      ],
      infoImage: ImageHolder.d1
    },
    {
      text1: t('_4_2'),
      text2: t('goal') + "3×35",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s35'),
      ],
      infoImage: ImageHolder.d2
    },
    {
      text1: t('_4_3'),
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d03.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s30'),
      ],
      infoImage: ImageHolder.d3
    }, {
      text1: t('_4_4'),
      text2: t('goal') + "2×25",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d04.mp4",
      subStep: [
        t('_1s8'),
        t('_2s15'),
        t('_3s25'),
      ],
      infoImage: ImageHolder.d4
    }, {
      text1: t('_4_5'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d05.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      infoImage: ImageHolder.d5
    },
    {
      text1: t('_4_6'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d06.mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: ImageHolder.d6
    },
    {
      text1: t('_4_7'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d07" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: ImageHolder.d7
    },
    {
      text1: t('_4_8'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d08" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: ImageHolder.d8
    },
    {
      text1: t('_4_9'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "d09" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: ImageHolder.d9
    },
    {
      text1: t('_4_10'),
      text2: t('final_goal') + "2×30",
      videoUrl: VIDEO_PREFIX + "d10" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s30'),
      ],
      infoImage: ImageHolder.d10
    }
  ],
  bridge: [
    {
      text1: t('_5_1'),
      text2: t('goal') + "3×50",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e01.mp4",
      subStep: [
        t('_1s10'),
        t('_1s25'),
        t('_3s50'),
      ],
      infoImage: ImageHolder.e1
    },
    {
      text1: t('_5_2'),
      text2: t('goal') + "3×40",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e02.mp4",
      subStep: [
        t('_1s10'),
        t('_2s20'),
        t('_3s40'),
      ],
      infoImage: ImageHolder.e2
    },
    {
      text1: t('_5_3'),
      text2: t('goal') + "3×30",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e03.mp4",
      subStep: [
        t('_1s8'),
        t('_2s15'),
        t('_3s30'),
      ],
      infoImage: ImageHolder.e3
    }, {
      text1: t('_5_4'),
      text2: t('goal') + "2×25",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e04.mp4",
      subStep: [
        t('_1s10'),
        t('_2s15'),
        t('_3s25'),
      ],
      infoImage: ImageHolder.e4
    }, {
      text1: t('_5_5'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e05.mp4",
      subStep: [
        t('_1s8'),
        t('_2s15'),
        t('_2s20'),
      ],
      infoImage: ImageHolder.e5
    },
    {
      text1: t('_5_6'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e06.mp4",
      subStep: [
        t('_1s6'),
        t('_2s10'),
        t('_2s15'),
      ],
      infoImage: ImageHolder.e6
    },
    {
      text1: t('_5_7'),
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e07" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s3'),
        t('_2s6'),
        t('_2s10'),
      ],
      infoImage: ImageHolder.e7
    },
    {
      text1: t('_5_8'),
      text2: t('goal') + "2×8",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e08" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s2'),
        t('_2s4'),
        t('_2s8'),
      ],
      infoImage: ImageHolder.e8
    },
    {
      text1: t('_5_9'),
      text2: t('goal') + "2×6",
      text3: t('next_step'),
      videoUrl: VIDEO_PREFIX + "e09" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s1'),
        t('_2s3'),
        t('_2s6'),
      ],
      infoImage: ImageHolder.e9
    },
    {
      text1: t('_5_10'),
      text2: t('final_goal') + "2×30",
      videoUrl: VIDEO_PREFIX + "e10" + (I18nView.localeZh() ? "_empty" : "") + ".mp4",
      subStep: [
        t('_1s1'),
        t('_2s3'),
        t('_2s30'),
      ],
      infoImage: ImageHolder.e10
    }
  ],
  handstand: [
    {
      text1: t('_6_1'),
      text2: t('goal') + t('_2m'),
      text3: t('next_step'),
      subStep: [
        t('_30s'),
        t('_1m'),
        t('_2m'),
      ],
      videoUrl: VIDEO_PREFIX + "f01.mp4",
      infoImage: ImageHolder.f1
    },
    {
      text1: t('_6_2'),
      text2: t('goal') + t('_1m'),
      text3: t('next_step'),
      subStep: [
        t('_10s'),
        t('_30s'),
        t('_1m'),
      ],
      videoUrl:  VIDEO_PREFIX + "f02.mp4",
      infoImage: ImageHolder.f2
    },
    {
      text1: t('_6_3'),
      text2: t('goal') + t('_2m'),
      text3: t('next_step'),
      subStep: [
        t('_10s'),
        t('_1m'),
        t('_2m'),
      ],
      videoUrl:  VIDEO_PREFIX + "f03.mp4",
      infoImage: ImageHolder.f3
    }, {
      text1: t('_6_4'),
      text2: t('goal') + "2×20",
      text3: t('next_step'),
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s20'),
      ],
      videoUrl:  VIDEO_PREFIX + "f04.mp4",
      infoImage: ImageHolder.f4
    }, {
      text1: t('_6_5'),
      text2: t('goal') + "2×15",
      text3: t('next_step'),
      subStep: [
        t('_1s5'),
        t('_2s10'),
        t('_2s15'),
      ],
      videoUrl:  VIDEO_PREFIX + "f05.mp4",
      infoImage: ImageHolder.f5
    },
    {
      text1: t('_6_6'),
      text2: t('goal') + "2×12",
      text3: t('next_step'),
      subStep: [
        t('_1s5'),
        t('_2s9'),
        t('_2s12'),
      ],
      videoUrl: VIDEO_PREFIX + "f06.mp4",
      infoImage: ImageHolder.f6
    },
    {
      text1: t('_6_7'),
      text2: t('goal') + "2×10",
      text3: t('next_step'),
      subStep: [
        t('_1s5') + t('side'),
        t('_2s8') + t('side'),
        t('_2s10') + t('side'),
      ],
      videoUrl:  VIDEO_PREFIX + "f07.mp4",
      infoImage: ImageHolder.f7
    },
    {
      text1: t('_6_8'),
      text2: t('goal') + "2×8",
      text3: t('next_step'),
      subStep: [
        t('_1s4') + t('side'),
        t('_2s6') + t('side'),
        t('_2s8') + t('side'),
      ],
      videoUrl: VIDEO_PREFIX + "f08.mp4",
      infoImage: ImageHolder.f8
    },
    {
      text1: t('_6_9'),
      text2: t('goal') + "2×6",
      text3: t('next_step'),
      subStep: [
        t('_1s3') + t('side'),
        t('_2s4') + t('side'),
        t('_2s6') + t('side'),
      ],
      videoUrl:  VIDEO_PREFIX + "f09.mp4",
      infoImage: ImageHolder.f9
    },
    {
      text1: t('_6_10'),
      text2: t('final_goal') + "2×5",
      subStep: [
        t('_1s1') + t('side'),
        t('_2s2') + t('side'),
        t('_2s5') + t('side'),
      ],
      videoUrl: "",
      infoImage: ImageHolder.f10
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
