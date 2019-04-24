import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class NetWorkErrorView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 135, height: 165}} source={require('../img/default-upgrade.png')}/>
        <TouchableOpacity
          onPress={() => {
            this.props.setNetworkStatus(false);
            this.props.pullData();
          }}
          style={{borderWidth: 0.5, borderColor: '#999', borderRadius: 5, overflow: 'hidden'}}
        >
          <Text style={{fontSize: 15, color: '#999', padding: 6}}>重新加载</Text>
        </TouchableOpacity>
      </View>
    )
  }
};
