/**
 * Created by guguyanhua on 11/24/15.
 */
var React = require('react-native');
var { requireNativeComponent } = React;

class RNVideoView extends React.Component {
  constructor() {
  super();
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event: Event) {
    if (!this.props.onTouchPlayer) {
      return;
    }
    this.props.onTouchPlayer(event.nativeEvent.message);
  }

  render() {
    return <RCTVideo
        {...this.props}
        onChange={this._onChange}
        />;
  }
}

RNVideoView.propTypes = {

  paused: React.PropTypes.bool,
  url: React.PropTypes.string,
  onTouchPlayer: React.PropTypes.func,

  accessibilityComponentType: React.PropTypes.string,
  accessibilityLabel: React.PropTypes.string,
  accessibilityLiveRegion: React.PropTypes.string,
  backgroundColor: React.PropTypes.Color,
  decomposedMatrix: React.PropTypes.map,
  importantForAccessibility: React.PropTypes.string,
  opacity: React.PropTypes.number,
  renderToHardwareTextureAndroid: React.PropTypes.boolean,
  rotation: React.PropTypes.number,
  scaleX: React.PropTypes.number,
  scaleY: React.PropTypes.number,
  testID: React.PropTypes.string,
  translateX: React.PropTypes.number,
  translateY: React.PropTypes.number,
};

var RCTVideo = requireNativeComponent('RCTVideo', RNVideoView, {nativeOnly: {onChange: true}});

module.exports = RNVideoView;

//var { requireNativeComponent } = require('react-native');
//
//// requireNativeComponent automatically resolves this to "RCTMapManager"
//module.exports = requireNativeComponent('RCTChart', null);
