/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var StepList = require('../steplist');
var Chart = require('../../components/RNChart');
//var Reflux = require('reflux');
//var _ = require('lodash');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity,
    ScrollView,
    Image,
    } = React;

var ChartView = React.createClass({

  render: function () {
    return (
          <Chart
              style={styles.listView}
              webLineWidth={2}
                 data={{
                      x:['a','b','c','d','e','che'],
                      y:[3,2,5,1,7,8]
                      }}
              />
    );

  }
});


var styles = StyleSheet.create({
  listView: {
    height: 200,
    width:200,
  },
  nav: {
    flex: 1,
    height: 64,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  }
});

module.exports = ChartView;
