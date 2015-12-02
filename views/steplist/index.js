/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var Reflux = require('reflux');
var StepStore = require('../../stores/StepStore');
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
    Image
    } = React;
var Modal = require('react-native-fs-modal');

var StepItem = React.createClass({
  pushPaperById(){
    this.props.showModal();
  },
  render: function () {
    return (
        <View>
          <TouchableOpacity onPress={this.pushPaperById}>
            <View style={styles.container}>
              <Text style={styles.content}>{this.props.text1}</Text>
              <Text style={styles.content}>{this.props.text2}</Text>
              <Text style={styles.content}>{this.props.text3}</Text>
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
    };
  },
  showModal () {
    this.refs.modal.show();
  },

  hideModal () {
    this.refs.modal.close();
  },
  render: function () {
    return (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.pop}>
              <Text style={{marginLeft:20,marginTop:20}}>关闭</Text>
            </TouchableOpacity>
            <Text style={{marginLeft:40}}>俯卧撑系列升级表</Text>
          </View>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.steps)}
              renderRow={this.renderType}
              style={styles.listView}
              />
          <Modal
              // Use ref to allow open/close
              ref={'modal'}

              // Duration of animation (defaults 500)
              duration={10}

              // Any tween function (defaults 'easeOutBack')
              tween={'linear'}

              // Pass styles to modal
              modalStyle={{borderRadius: 0}}

              // Hide/show UIStatusBar (defaults to true)
              hideStatusBar={true}
              >
            <View>
              <View style={{padding:30}}>
                <Text>第一式</Text>
                <Text>墙壁俯卧撑</Text>
                <TouchableOpacity
                    onPress={this.hideModal.bind(this)}
                    >
                  <Text>开始</Text>
                </TouchableOpacity>
              </View>
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
  title: {
    fontSize: 20
  },
  listView: {
    flex: 1,
  },
  container: {
    flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 10
  },
  nav: {
    flex: 1,
    height: 64,
  },
  content: {
    color: 'white'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  }
});

module.exports = StepsView;
