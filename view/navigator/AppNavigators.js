import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';
import WelcomePage from '../page/welcomePage';
import HomePage from '../page/homePage';
import DetailPage from '../page/detailPage';
import AboutPage from '../page/my/aboutPage';
import AboutMePage from '../page/my/aboutMePage';
import CustomKeyPage from '../page/my/customKeyPage';
import SearchPage from '../page/my/searchPage';
import CodePushPage from '../page/my/codePushPage';
import SortKeyPage from '../page/my/sortKeyPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';

export const rootCom = 'Init'; // 设置跟路由

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null
    }
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null
    }
  },
  AboutMePage: {
    screen: AboutMePage,
    navigationOptions: {
      header: null
    }
  },
  CustomKeyPage: {
    screen: CustomKeyPage,
    navigationOptions: {
      header: null
    }
  },
  SortKeyPage: {
    screen: SortKeyPage,
    navigationOptions: {
      header: null
    }
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
  },
  CodePushPage: {
    screen: CodePushPage,
    navigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
  }
}, {
  defaultNavigationOptions: {
    header: null
  }
});

// export default RootNavigator = createAppContainer(MainNavigator);
export const RootNavigator = createAppContainer(createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator
}, {
  navigationOptions: {
    header: null
  }
}));

// 对react-navigation-redux-helpers3.0，
// 1:reduxifyNavigator被改名为createReduxContainer
// 2:createReactNavigationReduxMiddleware的参数顺序发生了变化：
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);

const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
