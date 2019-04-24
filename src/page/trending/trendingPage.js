import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from '../../navigator/NavigationUtil';
import {connect} from 'react-redux';
import NavigationBar from '../../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingDialog from './tmp/trendingDialog';
import TrendingTab from './tmp/trendingTab';

type Props = {};
class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props);
    // this.tabs = ['all', 'java', 'javascript', 'Ruby', 'Vue', 'Shell'];
    // this.timeOptions = [{text: '今天', key: 'daily'}, {text: '本周', key: 'weekly'}, {text: '本月', key: 'monthly'}];
    this.state = {
      timeOption: {
        text: '今天',
        key: 'daily'
      }
    }
  }

  _getTabs = (tabs) => {
    const TABS = {};
    const checkedTabs = tabs.filter((item) => item.checked);
    let {theme} = this.props;
    checkedTabs.forEach((item, index) => {
      TABS[`tab${index}`] = {
        screen: () => <TrendingTab tabLabel={item.name} theme={theme} timeOption={this.state.timeOption} />,
        navigationOptions: {
          title: item.name
        }
      }
    });
    return TABS;
  };

  onSelectTimeOptions = (option) => {
    this.dialog.hide();
    if (!option) {return ;}
    if (option.key === this.state.timeOption.key) {
      return ;
    }
    this.setState({
      timeOption: option
    });
  };

  renderTitleView = () => {
    return (
      <View>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={() => this.dialog.show()}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18,color: '#FFFFFF',fontWeight: '400'}}>趋势#{this.state.timeOption.text}</Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{color: 'white'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
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

  renderDialog = () => {
    return (
      <TrendingDialog
        ref={dialog => this.dialog = dialog}
        onSelect={option => this.onSelectTimeOptions(option)}
      />
    )
  };

  render() {
    const {theme} = this.props.theme;
    const {customLanguage} = this.props.language;
    // console.log(this.props, 'trending');
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    let navigationBar = <NavigationBar
      titleView={this.renderTitleView()}
      statusBar={statusBar}
      style={{backgroundColor: theme}}
      titleLayoutStyle={styles.titleView}
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
        {TabNavigator && <TabNavigator />}
        {this.renderDialog()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    theme: state.theme
  };
};

export default connect(mapStateToProps, null)(TrendingPage);

const styles = StyleSheet.create({
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

