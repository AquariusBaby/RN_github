import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class CodePushPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItem: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 16}}>CodePush</Text>
      </View>
    )
  }
}
