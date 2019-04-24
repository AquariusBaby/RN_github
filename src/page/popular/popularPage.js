import React, {Component} from 'react';
import {View, Text,Image, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Button} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from '../../navigator/NavigationUtil';
import {connect} from 'react-redux';
import NavigationBar from '../../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PopularTab from './tmp/popularTab';

class PopularPage extends Component{
  constructor(props) {
    super(props);
  }

  _getTabs = (tabs) => {
    const TABS = {};
    const checkedTabs = tabs.filter((item) => item.checked);
    checkedTabs.forEach((item, index) => {
       TABS[`tab${index}`] = {
         screen: () => <PopularTab key={index} tabLabel={item.name} theme={this.props.theme} />,
         navigationOptions: {
           title: item.name
         }
       }
     });
     return TABS;
  };

  renderRightButton = () => {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log('按钮');
          NavigationUtil.goToPage({
            theme
          }, 'SearchPage')
        }}
      >
        <View style={{padding: 5, marginRight: 8}}>
          <Ionicons
            name={'ios-search'}
            size={24}
            style={{
              marginRight: 8,
              alignSelf: 'center',
              color: 'white'
            }}
          />
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    const {theme} = this.props.theme;
    const {customLanguage} = this.props.language;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    let navigationBar = <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      titleLayoutStyle={styles.titleView}
      style={{backgroundColor: theme}}
      rightButton={this.renderRightButton()}
    />;
    const TabNavigator = customLanguage.length ?
      createAppContainer(createMaterialTopTabNavigator(
        this._getTabs(customLanguage),
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false, // 是否标签大写
            scrollEnabled: true, // 是否支持 选项卡滚动， 默认false
            style: {
              backgroundColor: theme, //TabBar 的背景颜色
              height:40 //fix 开启scrollEnabled后再Android上初次加载时闪烁问题
            },
            indicatorStyle: styles.indicatorStyle, //标签指示器的样式
            labelStyle: styles.labelStyle //文字的样式
          },
          lazy: true
        }
      )) : null;

    return (
      <View style={{flex: 1}}>
        {navigationBar}
        {
          TabNavigator && <TabNavigator />
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    language: state.language
  };
};

export default connect(mapStateToProps, null)(PopularPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  titleView: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  }
});
