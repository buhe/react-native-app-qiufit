/**
 * es6
 * 动态
 * Created by guguyanhua on 12/9/15.
 */
import React, {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Nav from "../../nav/CommonNav";

export default class Trend extends React.Component {

  render(){
    return (
        <Nav
            navText = {'训练动态'}
            {... this.props}
            />
    );
  }

}
