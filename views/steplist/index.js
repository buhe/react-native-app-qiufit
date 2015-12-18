/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var StepStore = require('../../stores/StepStore');
var StepModal = require('./modal');
var deviceScreen = require('Dimensions').get('window');
const IMG_PREFIX = 'http://7xotx8.com2.z0.glb.qiniucdn.com/';
var Router = require('../router');
var API = require('../../api');
var StepActionCreators = require('../../actions/StepActionCreators');
//var _ = require('lodash');

var {
    StyleSheet,
    Text,
    View,
    ListView,
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
    var myStyles = [styles.container];
    if (this.props.selected) {
      myStyles.push(styles.selected);
    }
    return (
        <View>
          <TouchableOpacity onPress={this.pushPaperById}>
            <View style={myStyles}>
              <Text style={styles.itemTitle}>{this.props.text1}</Text>
              <Text style={styles.itemDesc}>{this.props.text2}</Text>
              <Text style={styles.itemDesc2}>{this.props.text3}</Text>
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
  componentDidMount(){
    StepActionCreators.fetchByType('pushUp');
  },
  getInitialState: function () {
    //ResumesActionCreators.fetchResumes();
    //StepStore.fetchByType('pushUp');

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
    this.props.navigator.push(Router.getVideo());
  },
  render: function () {
    return (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.pop}>
              <Image source={{uri:IMG_PREFIX + 'btn_close.png'}} style={styles.closeImage}/>
            </TouchableOpacity>
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
            selected={q.selected}
            showModal={this.showModal}
            {...this.props}
            />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
    height: deviceScreen.height - 60,
  },
  container: {
    flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 150,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    paddingTop: 15,
    paddingBottom: 15,
  },
  selected: {
    backgroundColor: 'gray'
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  itemDesc: {
    marginTop: 20,
    fontSize: 24,
    color: 'white'
  },
  itemDesc2: {
    marginTop: 10,
    fontSize: 24,
    color: 'white'
  },
  nav: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
  },
  logoText: {
    fontSize: 30,
    marginTop: 18,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#1d1d1d'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  modalStyle: {
    height: 365,
    width: 315,
    marginTop: (deviceScreen.height - 365) / 2,
    marginLeft: (deviceScreen.width - 315 - 40) / 2,
  },
  closeImage: {
    left: 0,
    top: 0,
    width: 60,
    height: 60,
  }
});

module.exports = StepsView;

