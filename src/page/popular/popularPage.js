import React, {Component} from 'react';
import {View, Text,Image, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Button} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from '../../navigator/NavigationUtil';
import {connect} from 'react-redux';
import {onThemeChange} from '../../action/theme';
import {onLoadPopularData} from '../../action/popular';
import DataStore from '../../expand/dao/dataStore';
import Types from '../../action/types';
import PopularItem from './tmp/popularItem';
import LoadMore from '../../common/loadMore';
import NavigationBar from '../../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

type Props = {};
class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
  }

  _getTabs = (tabs) => {
    const TABS = {};
    const checkedTabs = tabs.filter((item) => item.checked);
    checkedTabs.forEach((item, index) => {
       TABS[`tab${index}`] = {
         screen: props => <PopularTab key={index} {...props} popular={this.props.popular} onLoadData={this.props.onLoadPopularData} tabLabel={item.name} theme={this.props.theme} />,
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
    // const No_Data_Image = ;
    // console.log(theme);
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    // console.log(statusBar);
    let navigationBar = <NavigationBar title={'最热'} statusBar={statusBar} titleLayoutStyle={styles.titleView} style={{backgroundColor: theme}} rightButton={this.renderRightButton()} />;
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

class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    // page： 第几页，从1开始(如果小于1，则默认为第1页)
    // per_page : 每页多少个项
    this.pageCount = 1;
    this.pageSize = 10;
    this.isCanLoadMore = false;
    // this.netWorkError = false;
    this.state = {
      data: [],
      isLoading: false,
      netWorkError: false,
      isListInit: true
    }
  }
  componentDidMount() {
    this.pullData();
  }
  pullData() {
    const url = this.getFetchUrl(this.storeName, this.pageCount, this.pageSize);
    // this.props.onLoadData(this.storeName, url);
    let dataStore = new DataStore();
    this.setState({
      isLoading: true
    });
    dataStore.fetchData(url)
      .then(data => {
        console.log(data, url);
        // if (this.pageCount === 1) {
        //   this.isCanLoadMore = true;
        // }
        this.setState({
          data: this.pageCount === 1 ? [...data.items] : [...this.state.data, ...data.items],
          isLoading: false
        });
        this.pageCount ++;
        // this.props.onLoadData({
        //   type: Types.LOAD_POPULAR_SUCCESS,
        //   items: data && data.data && data.data.items,
        //   storeName: this.storeName
        // });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          netWorkError: true
        });
        console.log(error);
        // this.props.onLoadData({
        //   type: Types.LOAD_POPULAR_FAIL,
        //   storeName: this.storeName
        // });
      })
  }
  getFetchUrl(key, page, pageSize) {
    return `${URL}${key}${QUERY_STR}&page=${page}&per_page=${pageSize}`;
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

  // 初始化的骨架图
  _renderInitComponent = () => {
    const num = [0,0,0,0,0,0];
    // let num = new Array(5);
    return (
      <View style={{flex: 1, overflow: 'hidden', justifyContent: 'flex-start'}}>
        {
          num.map((item, index) => (
              <View style={styles.cell_container} key={index}>
                <Text style={styles.title} />
                <Text style={styles.description} />
                <View style={styles.row} />
              </View>
            )
          )
        }
      </View>
    )
  };

  // 列表的底部组件
  _renderListFootComponent = () => {
    return (
      <LoadMore LoadMoreText="努力加载中..." type="3" />
    )
  };

  // 列表无数据时的空列表组件
  _renderEmptyComponent = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 135, height: 165}} source={require('../../img/default-upgrade.png')} />
      </View>
    )
  };

  // 网络出错时展示组件
  _renderNetWorkErrorComponent = () => {
    return (
      <View style={{flex: 1,height:'100%', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 135, height: 165}} source={require('../../img/default-upgrade.png')} />
        <TouchableOpacity
          onPress={() => {
            this.setState({
              netWorkError: false
            });
            this.pullData();
          }}
          style={{borderWidth: 0.5, borderColor: '#999', borderRadius: 5, overflow: 'hidden'}}>
          <Text style={{fontSize: 15, color: '#999', padding: 6}}>重新加载</Text>
        </TouchableOpacity>
      </View>
    )
  };

  render() {
    const {theme} = this.props.theme;
    return (
      <View style={styles.container}>
        {
          this.state.netWorkError ?
            this._renderNetWorkErrorComponent() :
            this.state.data.length ?
              <FlatList
              data={this.state.data}
              renderItem={data => this.renderItem(data)}
              keyExtractor={item => `${item.id}`}
              getItemLayout={(data, index) => ({length: 119, offset: 119*index, index})}
              refreshControl={
                <RefreshControl
                  title={'Loading'}
                  titleColor={theme}
                  colors={[theme]}
                  refreshing={this.state.isLoading}
                  onRefresh={() => {
                    // console.log('刷新');
                    this.pageCount = 1;
                    this.isCanLoadMore = false;
                    this.pullData();
                  }}
                  tintColor={theme}
                />
              }
              onEndReached={() => {
                // console.log(this.isCanLoadMore, this.state.isLoading);
                if (this.isCanLoadMore && !this.state.isLoading) {
                  console.log('---onEndReached----');
                  this.pullData();
                }
              }
              }
              onEndReachedThreshold={0.1}
              ListFooterComponent={this._renderListFootComponent}
              // ListEmptyComponent={this._renderEmptyComponent}
              onMomentumScrollBegin={() => {
                // console.log('触发滚动动画');
                // 滚动动画开始时调用此函数。
                this.isCanLoadMore = true;
              }}
            /> :
              this._renderInitComponent()
        }

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    popular: state.popular,
    language: state.language
  };
};

const mapDispatchToProps = dispatch => ({
  changeTheme: (status) => {
    dispatch(onThemeChange(status));
  },
  onLoadPopularData: (obj) => {
    dispatch(obj);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
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
  },
  cell_container: {
    height: 119,
    overflow: 'hidden',
    // flex: 1,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowRadius: 1,
    backgroundColor: 'white',
    elevation: 2
  },
  title: {
    width: 200,
    height: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden'
  },
  description: {
    height: 52,
    width: '100%',
    // flex: 1,
    // height: 60,
    marginTop: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden'
  },
  row: {
    width: '100%',
    height: 14,
    marginTop: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden'
  }
});
