import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image} from 'react-native';
import NavigationUtil from '../../../navigator/NavigationUtil';
import DataStore from '../../../expand/dao/dataStore';
import TrendingItem from './trendingItem';
import LoadMore from '../../../common/loadMore';
import Skeleton from '../../../common/Skeleton';
import NetWorkErrorView from '../../../common/NetWorkErrorView';

const URL = 'https://githubtrendingapi.xyz/.netlify/functions/trending?';

export default class PopularTab extends Component {
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
    this.pullData();
  }

  getFetchUrl(key, page, pageSize) {
    console.log(`${URL}language=${key}&amp;&since=${this.props.timeOption.key}&page=${page}&per_page=${pageSize}`, 'bbb', this.props.timeOption);
    return `${URL}language=${key}&amp;&since=${this.props.timeOption.key}&page=${page}&per_page=${pageSize}`;
  }

  setNetworkStatus = (status) => {
    this.setState({
      netWorkError: status
    })
  };

  pullData() {
    const url = this.getFetchUrl(this.storeName, this.pageCount, this.pageSize);
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
    return (
      <Skeleton />
    )
  };

  // 网络出错时展示组件
  _renderNetWorkErrorComponent = () => {
    return (
      <NetWorkErrorView pullData={this.pullData} setNetworkStatus={this.setNetworkStatus} />
    )
  };

  // 列表的底部组件
  _renderListFootComponent = () => {
    return (
      <LoadMore LoadMoreText="努力加载中..." type="3" />
    )
  };

  // 列表无数据时的空列表组件
  // _renderEmptyComponent = () => {
  //   return (
  //     <View>
  //       <Text>暂无数据！</Text>
  //     </View>
  //   )
  // };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
});
