// TrendingPage
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from '../../navigator/NavigationUtil';
import {connect} from 'react-redux';
import {onThemeChange} from '../../action/theme';
// import {onLoadPopularData} from '../../action/popular';
import DataStore from '../../expand/dao/dataStore';
// import Types from '../../action/types';
import TrendingItem from './trendingItem';
import LoadMore from './loadMore';
import NavigationBar from '../../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingDialog from './trendingDialog';

// const URL = 'https://github.com/trending/';
const URL = 'https://githubtrendingapi.xyz/.netlify/functions/trending?';
// const QUERY_STR = 'since=monthly'; // daily  weekly  monthly

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
        screen: props => <PopularTab {...props} popular={this.props.popular} onLoadData={this.props.onLoadPopularData} tabLabel={item.name} theme={theme} timeOption={this.state.timeOption} />,
        navigationOptions: {
          title: item.name
        }
      }
    });
    return TABS;
  };

  onSelectTimeOptions = (option) => {
    this.dialog.hide();
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
    this.state = {
      data: [],
      isLoading: false,
      netWorkError: false,
      isListInit: true
    }
  }
  componentDidMount() {
    // console.log(this.props, 'sss');
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
        console.log(data, url, 'aaa');
        this.setState({
          data: this.pageCount === 1 ? [...data] : [...this.state.data, ...data],
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
    console.log(`${URL}language=${key}&amp;&since=${this.props.timeOption.key}&page=${page}&per_page=${pageSize}`, 'bbb', this.props.timeOption);
    return `${URL}language=${key}&amp;&since=${this.props.timeOption.key}&page=${page}&per_page=${pageSize}`;
  }
  renderItem = (data) => {
    const {item} = data;
    const {theme} = this.props;
    // console.log(theme, this.props.theme, 'bbb');
    return <TrendingItem
      dataList={item}
      theme={theme}
      onSelect={(callBack) => {
        NavigationUtil.goToPage({
          theme: theme,
          projectModel: item,
          callBack
        }, 'DetailPage');
      }}
    />
  };

  // 初始化的骨架图
  _renderInitComponent = () => {
    const num = [0,0,0,0,0,0];
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

  // 列表的底部组件
  _renderListFootComponent = () => {
    return (
      <LoadMore LoadMoreText="努力加载中..." type="3" />
    )
  };

  // 列表无数据时的空列表组件
  _renderEmptyComponent = () => {
    return (
      <View>
        <Text>暂无数据！</Text>
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
            keyExtractor={item => `${item.name}`}
            getItemLayout={(data, index) => ({length: 119, offset: 119*index, index})}
            refreshControl={
              <RefreshControl
                title={'Loading'}
                titleColor={theme}
                colors={theme}
                refreshing={this.state.isLoading}
                onRefresh={() => {
                  this.pageCount = 1;
                  this.isCanLoadMore = false;
                  this.pullData();
                }}
                tintColor={theme}
              />
            }
            onEndReached={() => {
                if (this.isCanLoadMore && !this.state.isLoading) {
                  console.log('---onEndReached----');
                  this.pullData();
                }
              }
            }
            onEndReachedThreshold={0.1}
            ListFooterComponent={this._renderListFootComponent}
            onMomentumScrollBegin={() => {
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
  // console.log(state, 'aaa');
  return {
    language: state.language,
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

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);

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
  cell_container: {
    height: 119,
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
    width: '100%',
    // flex: 1,
    // height: 60,
    height: 52,
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

