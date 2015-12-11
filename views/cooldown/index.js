/**
 * Created by guguyanhua on 12/11/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
var TimerMixin = require('react-timer-mixin');

var CoolDown = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      time: this.props.time ? this.props.time : 60,
      disabled: true
    };
  },
  componentDidMount(){
    this._cooldown();
  },
  render(){
    var style = [styles.text];
    var component;
    if (this.state.disabled) {
      style.push({color: 'gray'});
      component =
          <View
              style={styles.wrapper}
              >
            <TouchableWithoutFeedback
                >
              <Text style={style}>再发一次({this.state.time})</Text>
            </TouchableWithoutFeedback>
          </View>
    } else {
      component =
          <TouchableHighlight
              style={styles.wrapper}
              onPress={this._onPress.bind(this)}
              >
            <Text style={style}>再发一次({this.state.time})</Text>
          </TouchableHighlight>
    }
    return (
        component
    )
  },
  _onPress(){
    if (this.state.disabled) {
      //nothing
    } else {
      this.setState({disabled: true});
      this._cooldown();
    }
  },

  _cooldown(){
    var timer = function () {
      var time = this.state.time - 1;
      this.setState({time: time});
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({disabled: false});
        this.setState({time: this.props.time ? this.props.time : 60});
      }
    };
    this.setTimeout(timer.bind(this), 1000);
  }
});

var styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    backgroundColor: '#e5e5e5',
  }
});

module.exports = CoolDown;
