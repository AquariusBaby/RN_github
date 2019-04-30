import React, {Component} from 'react';
import {View, Text, TouchableOpacity, BackHandler, AsyncStorage} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';
import GlobalStyle from '../../data/globalStyles';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class AboutMePage extends Component {
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
          <Text style={{textAlign: 'center', fontSize: 16}}>-调试按钮-</Text>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem('Is_First', (error) => {
                if (error) {
                  this.toast.show('清除失败，出现错误');
                } else {
                  this.toast.show('清除成功');
                }
              })
            }}
          >
            <Text style={{padding: 5, borderWidth: 1, borderColor: '#cecece', width: 200,height: 40,alignItem: 'center'}}>清除初始化启动屏的本地存储</Text>
          </TouchableOpacity>
        </View>
        <Toast
          ref={toast => this.toast = toast}
          style={{backgroundColor: '#000000', padding: 10}}
          position='center'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.4}
          textStyle={{color:'#fff'}}
        />
      </SafeAreaViewPlus>
    )
  }
}
