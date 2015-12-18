/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var API = require('../../api');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    } = React;
import ExNavigator from '@exponent/react-native-navigator';
var Router = require('../router');
import UserStore from '../../stores/UserStore';

var renderFunc = function (props) {
  return (
      <Navigator.NavigationBar {...props} />
  );
};

var MainView = React.createClass({
  render: function () {
    return (<ExNavigator
        initialRoute={Router.getTypeList()}
        style={{ flex: 1 }}
        //sceneStyle={{ paddingTop: 64 }}
        //renderNavigationBar={renderFunc}
        showNavigationBar={false}
        />);
  }
});

var WelcomeView = React.createClass({
  render: function () {
    return (<ExNavigator
        initialRoute={Router.getWelcome()}
        style={{ flex: 1 }}
        //sceneStyle={{ paddingTop: 64 }}
        //renderNavigationBar={renderFunc}
        showNavigationBar={false}
        />);
  }
});

var PrisonerFitness = React.createClass({
  mixins: [Reflux.connect(UserStore)],
  render: function () {
    var view;
    if (this.state.user.username && this.state.user.verify === 'TRUE') {
      view = <MainView />;
    } else {
      view = <WelcomeView />;
    }
    return view;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PrisonerFitness', () => PrisonerFitness);
