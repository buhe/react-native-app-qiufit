/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    } = React;
import ExNavigator from '@exponent/react-native-navigator';
var Router = require('./views/router');

var renderFunc = function (props) {
  return (
      <Navigator.NavigationBar {...props} />
  );
};

var PrisonerFitness = React.createClass({
  render: function () {
    return (
        <ExNavigator
            initialRoute={Router.getLogin()}
            style={{ flex: 1 }}
            //sceneStyle={{ paddingTop: 64 }}
            //renderNavigationBar={renderFunc}
            showNavigationBar={false}
            />
    );
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
