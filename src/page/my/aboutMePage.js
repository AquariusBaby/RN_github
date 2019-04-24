import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';
import GlobalStyle from '../../data/globalStyles';


export default class AboutMePage extends Component {
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
      <SafeAreaViewPlus
        topColor={theme}
        style={GlobalStyle}
        bottomInset={true}
      >
        {navigationBar}
        <View style={{flex: 1, alignItem: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 16}}>懒的很，啥也没有!</Text>
        </View>
      </SafeAreaViewPlus>
    )
  }
}
