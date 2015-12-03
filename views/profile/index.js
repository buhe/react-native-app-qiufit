/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var ProfileStore = require('../../stores/ProfileStore');
var deviceScreen = require('Dimensions').get('window');
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
    PixelRatio
    } = React;


var StepsView = React.createClass({
  mixins: [
    Reflux.connect(ProfileStore)
  ],
  //getInitialState: function () {
  //  //ResumesActionCreators.fetchResumes();
  //  return {
  //
  //  };
  //},
  render: function () {
    return (
        <View>
          <View style={styles.nav}>
            <Text style={styles.logoText}>{this.state.stepName}系列升级表</Text>
          </View>
        </View>
    );

  }
});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  container: {
    flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 300 / PixelRatio.get(),
    marginTop: 20 / PixelRatio.get(),
    marginBottom: 20 / PixelRatio.get(),
    marginLeft: 70 / PixelRatio.get(),
    marginRight: 70 / PixelRatio.get(),
    paddingTop: 30 / PixelRatio.get(),
    paddingBottom: 30 / PixelRatio.get(),
  },
  itemTitle: {
    fontSize: 60 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    color: 'white'
  },
  itemDesc: {
    fontSize: 50 / PixelRatio.getFontScale(),
    color: 'white'
  },
  nav: {
    alignItems: 'center',
    padding: 40 / PixelRatio.get(),
    flex: 1,
    height: 180 / PixelRatio.get(),
  },
  logoText: {
    fontSize: 80 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    color: '#141414'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  modalStyle: {
    borderRadius: 0,
    height: 1030 / PixelRatio.get(),
    width: 930 / PixelRatio.get(),
    marginTop: 400 / PixelRatio.get(),
  }
});

module.exports = StepsView;

//<TouchableOpacity onPress={this.pop}>
//  <Text style={{marginLeft:20,marginTop:20}}>关闭</Text>
//</TouchableOpacity>
//<Text style={{marginLeft:40}}>俯卧撑系列升级表</Text>
//
