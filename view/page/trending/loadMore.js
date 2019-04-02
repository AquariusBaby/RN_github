import React, { Component } from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default class LoadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    let propsParam = this.props;
    let footer = null;
    switch (propsParam.type || 1) {
      case '1':
        footer =
          <View style={styles.loadingType}>
            <ActivityIndicator size="small"/>
          </View>;
        break;
      case '2':
        footer =
          <View style={styles.loadingType}>
            <Text style={styles.loadingText}>{propsParam.LoadMoreText}</Text>
          </View>;
        break;
      case '3':
        footer =
          <View style={styles.loadingType}>
            <ActivityIndicator size="small"/>
            <Text style={styles.loadingText}>{propsParam.LoadMoreText}</Text>
          </View>;
        break;
    }
    return footer;
  }
}

const styles = StyleSheet.create({
  loadingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  loadingType: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
