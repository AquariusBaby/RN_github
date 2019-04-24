import React, {Component} from 'react';
import NavigationUtil from '../../../navigator/NavigationUtil';
import DataStore from '../../../expand/dao/dataStore';
import Skeleton from '../../../common/Skeleton';
import {View, Text,Image, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Button} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import PopularItem from './popularItem';
import LoadMore from '../../../common/loadMore';
import NetWorkErrorView from '../../../common/NetWorkErrorView';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularTab extends Component {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    // // page： 第几页，从1开始(如果小于1，则默认为第1页)
    // // per_page : 每页多少个项
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
    this.pullData();
  }

  getFetchUrl = (key, page, pageSize) => {
    return `${URL}${key}${QUERY_STR}&page=${page}&per_page=${pageSize}`;
  };

  setNetworkStatus = (status) => {
    this.setState({
      netWorkError: status
    })
  };

  pullData = () => {
    const url = this.getFetchUrl(this.storeName, this.pageCount, this.pageSize);
    let dataStore = new DataStore();
    this.setState({
      isLoading: true
    });
    dataStore.fetchData(url)
      .then(data => {
        console.log(data, url);
        this.setState({
          data: this.pageCount === 1 ? [...data.items] : [...this.state.data, ...data.items],
          isLoading: false
        });
        this.pageCount ++;
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          netWorkError: true
        });
        console.log(error);
      })
  };

  renderItem(data) {
    const {item} = data;
    const {theme} = this.props;
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
    return (
      <Skeleton />
    )
  };

  // // 列表的底部组件
  _renderListFootComponent = () => {
    return (
      <LoadMore LoadMoreText="努力加载中..." type="3" />
    )
  };

  // // 网络出错时展示组件
  _renderNetWorkErrorComponent = () => {
    return (
      <NetWorkErrorView pullData={this.pullData} setNetworkStatus={this.setNetworkStatus} />
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
                    onRefresh={() =>
                      {
                        this.pageCount = 1;
                        this.isCanLoadMore = false;
                        this.pullData();
                      }
                    }
                    tintColor={theme}
                  />
                }
                onEndReached={() =>
                  {
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
  }
});
