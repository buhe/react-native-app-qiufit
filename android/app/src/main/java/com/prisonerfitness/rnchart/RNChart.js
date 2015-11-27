/**
 * Created by guguyanhua on 11/24/15.
 */
var React = require('react-native');
var { requireNativeComponent } = React;

class RNChartView extends React.Component {
  render() {
    return <RCTChart
        {...this.props}
        />;
  }
}

RNChartView.propTypes = {

  webLineWidth: React.PropTypes.number,
  data: React.PropTypes.shape({
    /**
     * Coordinates for the center of the map.
     */
    x: React.PropTypes.array.isRequired,
    y: React.PropTypes.array.isRequired
  }),
  accessibilityComponentType: React.PropTypes.string,
  accessibilityLabel: React.PropTypes.string,
  accessibilityLiveRegion: React.PropTypes.string,
  backgroundColor: React.PropTypes.Color,
  decomposedMatrix:  React.PropTypes.map,
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

var RCTChart = requireNativeComponent('RCTChart', RNChartView);

module.exports = RNChartView;

//var { requireNativeComponent } = require('react-native');
//
//// requireNativeComponent automatically resolves this to "RCTMapManager"
//module.exports = requireNativeComponent('RCTChart', null);
