/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
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
    Image
    } = React;

var stepList = [
  {
    stepname: "第一式 墙壁俯卧撑",
    desc: '逐步做到 3*50 次',
    next: '然后开始做第二式'
  },
  {
    stepname: "第二式 墙壁俯卧撑",
    desc: '逐步做到 3*50 次',
    next: '然后开始做第二式'
  },
  {
    stepname: "第三式 墙壁俯卧撑",
    desc: '逐步做到 3*50 次',
    next: '然后开始做第二式'
  },
  {
    stepname: "第四式 墙壁俯卧撑",
    desc: '逐步做到 3*50 次',
    next: '然后开始做第二式'
  },
  {
    stepname: "第五式 墙壁俯卧撑",
    desc: '逐步做到 3*50 次',
    next: '然后开始做第二式'
  },
];


var StepItem = React.createClass({
  pushPaperById(){

  },
  render: function () {
    return (
        <TouchableOpacity onPress={this.pushPaperById}>
          <View style={styles.container}>
            <Text style={styles.content}>{this.props.stepname}</Text>
            <Text style={styles.content}>{this.props.desc}</Text>
            <Text style={styles.content}>{this.props.next}</Text>
          </View>
        </TouchableOpacity>
    );
  }
});

var StepsView = React.createClass({
  getInitialState: function () {
    //ResumesActionCreators.fetchResumes();
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      stepList: stepList
    };
  },
  render: function () {
    return (
        <View>
          <Text style={styles.title}>俯卧撑系列升级表</Text>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.stepList)}
              renderRow={this.renderType}
              style={styles.listView}
              />
        </View>
    );

  },
  renderType: function (q) {
    return ( <StepItem
            stepname={q.stepname}
            stepname={q.stepname}
            desc={q.desc}
            next={q.next}
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
    //flexDirection: 'row',
    //justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    padding:10
  },
  content: {
    color:'white'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  }
});

module.exports = StepsView;
