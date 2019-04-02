import React, {Component} from 'react';
import {Text, View, StyleSheet, RefreshControl} from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../../common/NavigationBar';
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';
import {connect} from 'react-redux';


type Props = {};
class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props);
    // this.backPress =
  }

  componentDidMount() {

  }

  render() {
    const {theme} = this.props;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'收藏'}
        statusBar={statusBar}
        style={{backgroundColor: theme}}
      />
    );
    let TabView = (
      createAppContainer(createMaterialTopTabNavigator({
        'Popular': {
          screen: props => <FavoriteTab />,
          navigationOptions: {
            title: '最热'
          }
        },
        'Trending': {
          screen: props => <FavoriteTab />,
          navigationOptions: {
            title: '趋势'
          }
        }
      }, {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,//是否使标签大写，默认为true
          style: {
            backgroundColor: theme,//TabBar 的背景颜色
            height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle: styles.indicatorStyle,//标签指示器的样式
          labelStyle: styles.labelStyle,//文字的样式
        }
      }))
    );
    return (
      <View style={styles.container}>
        {navigationBar}
        <TabView />
        {/*<Text>FavoritePage123</Text>*/}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme
  }
};

export default connect(mapStateToProps, null)(FavoritePage);

class FavoriteTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>123</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
