/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var StepStore = require('../../stores/StepStore');
var StepModal = require('./modal');
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
var Modal = require('react-native-fs-modal');

var StepItem = React.createClass({
  pushPaperById(){
    this.props.showModal(this.props.text1, this.props.text2);
  },
  render: function () {
    return (
        <View>
          <TouchableOpacity onPress={this.pushPaperById}>
            <View style={styles.container}>
              <Text style={styles.itemTitle}>{this.props.text1}</Text>
              <Text style={styles.itemDesc}>{this.props.text2}</Text>
              <Text style={styles.itemDesc}>{this.props.text3}</Text>
            </View>
          </TouchableOpacity>
        </View>

    );
  }
});

var StepsView = React.createClass({
  mixins: [
    Reflux.connect(StepStore)
  ],
  pop(){
    this.props.navigator.pop();
  },
  getInitialState: function () {
    //ResumesActionCreators.fetchResumes();
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text1: '',
      text2: '',
    };
  },
  showModal (text1, text2) {
    this.refs.modal.show();
    this.setState({text1: text1, text2: text2});
  },

  hideModal () {
    this.refs.modal.close();
  },
  render: function () {
    return (
        <View>
          <View style={styles.nav}>
            <Text style={styles.logoText}>{this.state.stepName}系列升级表</Text>
          </View>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.steps)}
              renderRow={this.renderType}
              style={styles.listView}
              />
          <Modal
              ref={'modal'}
              duration={10}
              tween={'linear'}
              modalStyle={styles.modalStyle}
              >
            <View>
              <StepModal
                  step={this.state.text1}
                  name={this.state.text2}
                  actionClick={this.hideModal.bind(this)}
                  />
            </View>
          </Modal>
        </View>
    );

  },
  renderType: function (q) {
    return ( <StepItem
            text1={q.text1}
            text2={q.text2}
            text3={q.text3}
            showModal={this.showModal}
            {...this.props}
            />
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
