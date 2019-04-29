import React, {Component} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';
import GlobalStyle from '../../data/globalStyles';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackPressComponent from '../../common/BackPressComponent';

export default class CodePushPage extends Component {
  constructor(props) {
    super(props);
  }

  // 处理安卓物理返回键
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  };

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
          <Text style={{textAlign: 'center', fontSize: 16}}>CodePush</Text>
        </View>
      </SafeAreaViewPlus>
    )
  }
}
