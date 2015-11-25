/**
 * Created by guguyanhua on 11/24/15.
 */
var React = require('react-native');
var { requireNativeComponent } = React;

class RNChartView extends React.Component {
  render() {
    return <RCTChart {...this.props} />;
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
};

var RCTChart = requireNativeComponent('RCTChart', RNChartView);

module.exports = RNChartView;

//var { requireNativeComponent } = require('react-native');
//
//// requireNativeComponent automatically resolves this to "RCTMapManager"
//module.exports = requireNativeComponent('RCTChart', null);