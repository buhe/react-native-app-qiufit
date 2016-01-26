/**
 * Created by guguyanhua on 12/19/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import Theme from '../theme';

export default class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: props.items ? props.items[0] : '', index: 0}
  }

  _onChange(index,item) {
    if(this.props.onChangeItem){
      this.props.onChangeItem(index,item);
    }
  }

  prev() {
    if (this.state.index <= 0) {
      return;
    } else {
      var index = this.state.index - 1;
      this.setState({index: index, item: this.props.items[index]});
      this._onChange(index,this.props.items[index]);
    }
  }

  next() {
    if(this.state.index >= (this.props.items.length - 1)){
      return;
    }else{
      var index = this.state.index + 1;
      this.setState({index: index, item: this.props.items[index]});
      this._onChange(index,this.props.items[index]);
    }
  }

  render() {
    return (
        <View style={styles.month}>
          <TouchableWithoutFeedback onPress={this.prev.bind(this)}>
            <Image source={require('../../images/btn_arrow_left01.png')} style={styles.buttonIcon}/>
          </TouchableWithoutFeedback>
          <Text style={[styles.month_text,Theme.titleFont]}>{this.state.item}</Text>
          <TouchableWithoutFeedback onPress={this.next.bind(this)}>
            <Image source={require('../../images/btn_arrow_right01.png')} style={styles.buttonIcon}/>
          </TouchableWithoutFeedback>
        </View>
    );
  }

}

var styles = StyleSheet.create({
  month: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
    marginTop: 40,
    alignItems: 'center'
  },
  month_text: {
    fontSize: 18,
    //fontWeight: 'bold',
    color:'#1d1d1d',
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
});

