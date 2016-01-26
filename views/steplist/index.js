/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var StepStore = require('../../stores/StepStore');
var VideoStore = require('../../stores/VideoStore');
var StepModal = require('./modal');

var Router = require('../router');
var API = require('../../api');
var StepActionCreators = require('../../actions/StepActionCreators');
import VideoActionCreators from '../../actions/VideoActionCreators';
import I18nView from '../I18nView';
var _ = require('lodash');
var Theme = require('../theme');

var {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    ScrollView,
    Image,
    PixelRatio,
    Dimensions
    } = React;
var Modal = require('react-native-fs-modal');
var deviceScreen = Dimensions.get('window');

var StepItem = React.createClass({
  pushPaperById(){
    this.props.showModal(this.props.text1, this.props.text2, this.props.stepIndex);
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
              <Text style={[styles.itemTitle,Theme.titleFont]}>{this.props.text1}</Text>
              <Text style={[styles.itemDesc,Theme.subTitleFont]}>{this.props.text2}</Text>
              <Text style={[styles.itemDesc2,Theme.subTitleFont]}>{this.props.text3}</Text>
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

  },
  getInitialState: function () {
    StepActionCreators.fetchByType();
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      text1: '',
      text2: '',
      stepIndex: 0,
    };
  },
  showModal (text1, text2, stepIndex) {
    this.refs.modal.show();
    this.setState({text1: text1, text2: text2, stepIndex: stepIndex});
  },

  hideModal () {
    this.refs.modal.close();
    var ref = this.state.steps[this.state.stepIndex];
    VideoStore.reset();
    VideoActionCreators.setRef({
      typeText: ref.text1,
      type: this.state.typeName,
      step: parseInt(this.state.stepIndex),
      videoUrl: ref.videoUrl,
      subStep: ref.subStep,
      infoImage: ref.infoImage
    });
    this.props.navigator.push(Router.getVideo());
  },
  render: function () {
    var modalText = this.state.text1.split(" ");
    var step = modalText[0];
    var name = this.state.text1.replace(step + ' ','');
    var lines = _.ceil(name.length / 16);
    return (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.pop}>
              <Image source={require('../../images/btn_close.png')} style={styles.closeImage}/>
            </TouchableOpacity>
            <Text style={[{
                          fontSize: 30,
                          marginRight: (deviceScreen.width - 30 * this.state.stepName.length * I18nView.getI18nFontRadio() ) / 2,
                          fontWeight: 'bold',
                          color: '#1d1d1d'
                        },Theme.titleFont]}>{this.state.stepName}</Text>
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
              modalStyle={[styles.modalStyle,{
                height: 280 + lines * 50,
                marginTop: (deviceScreen.height - (280 + lines * 50)) / 2,
              }]}
              hideStatusBar={false}
              closeOnTouch={true}
              >
            <View>
              <StepModal
                  step={step}
                  name={name}
                  actionClick={this.hideModal.bind(this)}
                  />
            </View>
          </Modal>
        </View>
    );

  },
  renderType: function (q, sectionID, rowID) {
    return ( <StepItem
            text1={q.text1}
            text2={q.text2}
            text3={q.text3}
            selected={q.selected}
            stepIndex={rowID}
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
    //height: 150,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    padding:15,
  },
  selected: {
    backgroundColor: 'gray'
  },
  itemTitle: {
    fontSize: 24,
    //fontWeight: 'bold',
    color: 'white',
    textAlign:'center'
  },
  itemDesc: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    textAlign:'center'
  },
  itemDesc2: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    textAlign:'center'
  },
  nav: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  modalStyle: {
    //height: 330,
    width: 315,
    //marginTop: (deviceScreen.height - 330) / 2,
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

