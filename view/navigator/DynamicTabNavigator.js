import React, {Component} from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {BottomTabBar} from 'react-navigation-tabs'; // 这东西要link一下，坑死老子了
import PopularPage from '../page/popular/popularPage';
import TrendingPage from '../page/trending/trendingPage';
import FavoritePage from '../page/favorite/favoritePage';
import MyPage from '../page/my/myPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

type Props = {};

const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: "最热",
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: "趋势",
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons name={'md-trending-up'} size={26} style={{color: tintColor}} />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: "收藏",
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({tintColor, focused}) => (
        <Entypo name={'user'} size={26} style={{color: tintColor}} />
      )
    }
  }
};

class DynamicTabNavigator extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}; // 根据需要定制要显示的tab
    PopularPage.navigationOptions.tabBarLabel = '最热'; // 动态配置Tab相关属性，如text

    // console.log(this.props); // 这里的props是放在redux的
    return this.Tabs =  createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props => {return <CustomBottomBar theme={this.props.theme} {...props} />}
    }));

    // return this.Tabs =  createAppContainer(createBottomTabNavigator(tabs))
  }

  render() {
    const Tab = this._tabNavigator();
    return (
      <Tab/>
    )
  }
}

class CustomBottomBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log(this.props);
    return (
      <BottomTabBar {...this.props} activeTintColor={this.props.theme} />
    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps, null)(DynamicTabNavigator);
