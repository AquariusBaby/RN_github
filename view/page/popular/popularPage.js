import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from '../../navigator/NavigationUtil';
import {connect} from 'react-redux';
import {onThemeChange} from '../../action/theme';
import {onLoadPopularData} from '../../action/popular';
import DataStore from '../../expand/dao/dataStore';
import Types from '../../action/types';
import PopularItem from './popularItem';
import LoadMore from './loadMore';
import NavigationBar from '../../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};
class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.tabs = ['Java', 'C++', 'IOS', 'Javascript', 'Php', 'Node'];
  }

  _getTabs = () => {
     const TABS = {};
     this.tabs.forEach((item, index) => {
       TABS[`tab${index}`] = {
         screen: props => <PopularTab {...props} popular={this.props.popular} onLoadData={this.props.onLoadPopularData} tabLabel={item} theme={this.props.theme} />,
         navigationOptions: {
           title: item
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
          console.log('按钮');
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
    console.log(theme);
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    console.log(statusBar);
    let navigationBar = <NavigationBar title={'最热'} statusBar={statusBar} style={{backgroundColor: theme}} rightButton={this.renderRightButton()} />;
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
      this._getTabs(),
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
    ));

    return (
      <View style={{flex: 1}}>
        {navigationBar}
        <TabNavigator />
      </View>
    )
  }
}

class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    this.state = {
      data: [],
      isLoading: false
    }
  }
  componentDidMount() {
    // console.log(this.props, 'sss');
    this.pullData();
  }
  pullData() {
    const url = this.getFetchUrl(this.storeName);
    // this.props.onLoadData(this.storeName, url);
    let dataStore = new DataStore();
    this.setState({
      isLoading: true
    });
    dataStore.fetchData(url)
      .then(data => {
        console.log(data, url, 'aaa');
        this.setState({
          data: [...this.state.data, ...data.items],
          isLoading: false
        });
        // this.props.onLoadData({
        //   type: Types.LOAD_POPULAR_SUCCESS,
        //   items: data && data.data && data.data.items,
        //   storeName: this.storeName
        // });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.log(error);
        // this.props.onLoadData({
        //   type: Types.LOAD_POPULAR_FAIL,
        //   storeName: this.storeName
        // });
      })
  }
  getFetchUrl(key) {
    return `${URL}${key}${QUERY_STR}`;
  }
  renderItem(data) {
    const {item} = data;
    const {theme} = this.props;
    // console.log(data, 'bbb');
    return <PopularItem
      dataList={item}
      onSelect={(callback) => {
          NavigationUtil.goToPage({
            theme,
            projectModel: item,
            callback
          }, 'DetailPage')
        }
      } />
  }

  // 列表的底部组件
  _renderListFootComponent = () => {
    return (
      <LoadMore LoadMoreText="努力加载中..." type="3" />
    )
  };

  // 列表无数据时的空列表组件
  _renderEmptyComponent = () => {
    return (
      <View style={{width: '100%', height: '100%', flexDirection: 'row'}}>
        <Text style={{alignItems: 'center', justifyContent: 'center'}}>暂无数据！</Text>
      </View>
    )
  };

  render() {
    // const {popular} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => String(item.id + Math.random())}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={this.props.theme}
              colors={[this.props.theme]}
              refreshing={this.state.isLoading}
              onRefresh={() => this.pullData()}
              tintColor={this.props.theme}
            />
          }
          onEndReached={() => {
              console.log('---onEndReached----');
              this.pullData();
            }
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={this._renderListFootComponent}
          ListEmptyComponent={this._renderEmptyComponent}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state, 'aaa');
  return {
    theme: state.theme,
    popular: state.popular
  };
};

const mapDispatchToProps = dispatch => ({
  changeTheme: (status) => {
    console.log(status);
    dispatch(onThemeChange(status));
  },
  onLoadPopularData: (obj) => {
    console.log(obj, 'ss');
    // dispatch(onLoadPopularData(storeName, url));
    dispatch(obj);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
});
