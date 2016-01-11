/**
 * Created by guguyanhua on 10/30/15.
 */
var React = require('react-native');
var StepList = require('../steplist');
var Reflux = require('reflux');
var ProfileActionCreators = require('../../actions/ProfileActionCreators');
var StepActionCreators = require('../../actions/StepActionCreators');
var ProfileStore = require('../../stores/ProfileStore');
var StepStore = require('../../stores/StepStore');
import Promation from '../../promation';


var {
    AppRegistry,
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
var Router = require('../router');
var deviceScreen = Dimensions.get('window');

var typeList = [
  {
    name: 'pushUp',
    type: "俯卧撑",
    icon: '../../images/a.png',
    process: '2/10'
  },
  {
    name: 'deep',
    type: "深蹲",
    icon: '../../images/b.png',
    process: '2/10'
  },
  {
    name: 'pullUp',
    type: "引体向上",
    icon: '../../images/c.png',
    process: '0/10'
  },
  {
    name: 'leg',
    type: "举腿",
    icon: '../../images/d.png',
    process: '0/10'
  },
  {
    name: 'bridge',
    type: "桥",
    icon: '../../images/e.png',
    process: '0/10'
  },
  {
    name: 'handstand',
    type: "倒立撑",
    icon: '../../images/f.png',
    process: '0/10'
  },
];


var TypeItem = React.createClass({
  mixins: [
    Reflux.connect(StepStore)
  ],
  pushPaperById(){
    StepActionCreators.setTypeName(this.props.name);
    this.props.navigator.push(Router.getStepList());
  },
  render: function () {
    var steps = this.state.data[this.props.name];
    var process = 0;
    if (steps) {
      process = steps.length;
    }
    var icon;
    if (this.props.name === 'pushUp') {
      icon = <Image source={require('../../images/a.png')} style={styles.itemIcon}/>
    } else if (this.props.name === 'deep') {
      icon = <Image source={require('../../images/b.png')} style={styles.itemIcon}/>
    } else if (this.props.name === 'pullUp') {
      icon = <Image source={require('../../images/c.png')} style={styles.itemIcon}/>
    } else if (this.props.name === 'leg') {
      icon = <Image source={require('../../images/d.png')} style={styles.itemIcon}/>
    } else if (this.props.name === 'bridge') {
      icon = <Image source={require('../../images/e.png')} style={styles.itemIcon}/>
    } else if (this.props.name === 'handstand') {
      icon = <Image source={require('../../images/f.png')} style={styles.itemIcon}/>
    }
    return (
        <TouchableOpacity onPress={this.pushPaperById}>
          <View style={styles.container}>
            {icon}
            <View style={styles.itemTextWrapper}>
              <Text style={styles.itemText}>{this.props.type}</Text>
              <Text style={styles.itemProcessText}>{process}/10</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </TouchableOpacity>
    );
  }
});

var TypesView = React.createClass({
  mixins: [require('../../mixins/backandroid')()],
  profile(){
    this.props.navigator.push(Router.getProfile());
  },
  componentDidMount(){
    ProfileActionCreators.pullTurningDate();
    StepActionCreators.sync();
  },
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      typeList: typeList
    };
  },
  render: function () {
    return (
        <View>
          <View style={styles.nav}>
            <TouchableOpacity onPress={this.profile}>
              <Image source={require('../../images/navigation_me.png')} style={styles.profileImage}/>
            </TouchableOpacity>
            <View style={styles.logo}>
              <Image source={require('../../images/start_02.png')} style={styles.icon}/>
            </View>
            <TouchableOpacity onPress={()=> Promation.review()}>
              <Image source={require('../../images/navigation_like.png')}  style={styles.likeImage}/>
            </TouchableOpacity>
          </View>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.typeList)}
              renderRow={this.renderType}
              style={styles.listView}
              />
        </View>
    );

  },
  renderType: function (q) {
    return ( <TypeItem
            name={q.name}
            type={q.type}
            key={q.type}
            icon={q.icon}
            process={q.process}
            {...this.props}
            />
    );
  }
});


var styles = StyleSheet.create({
  listView: {
    flex: 1,
    height: deviceScreen.height - 60
  },
  nav: {
    flex: 1,
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    width: 127,
    height: 27,

  },
  logo: {
    //marginRight: (deviceScreen.width - 127 ) / 2,
  },
  itemIcon: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d1d1d'
  },
  itemProcessText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#1d1d1d'
  },
  profileImage: {
    marginLeft: 15,
    width: 30,
    height: 30,
  },
  likeImage: {
    marginRight: 15,
    width: 30,
    height: 30,
  }
});

module.exports = TypesView;
