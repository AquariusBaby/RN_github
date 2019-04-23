import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class FeedBackPage extends Component {
  constructor(props) {
    super(props);
  }

  renderLeftBtn = () => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => NavigationUtil.goBack(this.props.navigation)}
      >
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
    )
  };

  render() {
    let {title, theme} = this.props.navigation.state.params;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={title}
        statusBar={statusBar}
        style={{backgroundColor: theme}}
        leftButton={this.renderLeftBtn()}
      />
    );

    return (
      <View style={{flex: 1, alignItem: 'center', justifyContent: 'center'}}>
        {navigationBar}
        <WebView
          startInLoadingState={true}
          style={{flex: 1}}
          source={{uri: 'https://github.com/AquariusBaby/RN_github/issues'}}
        />
      </View>
    )
  }
}