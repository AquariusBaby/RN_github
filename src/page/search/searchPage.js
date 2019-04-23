import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, Platform, DeviceInfo, StyleSheet, FlatList, RefreshControl, Image} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PopularItem from '../popular/tmp/popularItem';
import LoadMore from '../../common/loadMore';
import DataStore from '../../expand/dao/dataStore';

const searchApi = `https://api.github.com/search/repositories?q=`;

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.routeParams = this.props.navigation.state.params;
    // page： 第几页，从1开始(如果小于1，则默认为第1页)
    // per_page : 每页多少个项
    this.pageCount = 1;
    this.pageSize = 10;
    this.isCanLoadMore = false;
    this.state = {
      data: [],
      isLoading: false,
      inputKey: '',
      isFocus: false
    }
  }

  renderSearchInputView = () => {
    // const placeholder = this.state.inputKey || '请输入';
    return (
      <View style={styles.inputViewContainer}>
        <Ionicons
          name={'ios-search'}
          size={18}
          style={{
            marginLeft: 8,
            marginRight: 4,
            alignSelf: 'center',
            color: '#666'
          }}
        />
        <TextInput
          ref={"input"}
          placeholder={'请输入'}
          onChangeText={text => this.setState({inputKey: text})}
          onFocus={() => this.setState({isFocus: true})}
          blurOnSubmit={true}
          onSubmitEditing={() => {
              this.setState({
                data: []
              });
              this.pageCount = 1;
              this.pullData();
            }
          }
          value={this.state.inputKey}
          style={styles.textInput}
        >
        </TextInput>
        {
          this.state.isFocus && this.state.inputKey.trim().length > 0 ?
            <Ionicons
              name={'ios-close-circle-outline'}
              size={18}
              style={{
                marginLeft: 4,
                marginRight: 8,
                alignSelf: 'center',
                color: '#666',
                zIndex: 100
              }}
              onPress={() => {
                  this.pageCount = 1;
                  this.setState({
                    inputKey: '',
                    data: []
                  })
                }
              }
            /> :
            <View
              style={{
                marginLeft: 4,
                marginRight: 8,
                alignSelf: 'center',
                color: '#666',
                zIndex: 100,
                width: 18
              }}
            />
        }
      </View>
    )
  };

  renderRightBtn = () => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => NavigationUtil.goBack(this.props.navigation)}
      >
        <Text style={{fontSize: 18, color: '#fff'}}>取消</Text>
      </TouchableOpacity>
    )
  };

  renderNavigationBar = () => {
    let {theme} = this.routeParams.theme;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    return (
      <NavigationBar
        // title={'搜索'}
        statusBar={statusBar}
        // style={theme}
        style={{backgroundColor: theme}}
        titleView={this.renderSearchInputView()}
        titleLayoutStyle={styles.inputViewContainer}
        // leftButton={this.renderLeftBtn()}
        rightButton={this.renderRightBtn()}
      />
    )
  };

  renderItem = (data) => {
    const {item} = data;
    const theme = this.routeParams.theme;
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
  };

  // 列表的底部组件
  _renderListFootComponent = () => {
    return (
      <LoadMore LoadMoreText="努力加载中..." type="3" />
    )
  };

  // 加载中视图
  _renderLoadingComponent = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 80, height: 80}}
          source={require('../../img/loading.gif')}
        />
      </View>
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

  getFetchUrl(QUERY_STR, page, pageSize = 10) {
    console.log(`${searchApi}${QUERY_STR}&page=${page}&per_page=${pageSize}`);
    return `${searchApi}${QUERY_STR}&page=${page}&per_page=${pageSize}`;
  }

  pullData = () => {
    // console.log('加载数据pulldata');
    const url = this.getFetchUrl(this.state.inputKey, this.pageCount, this.pageSize);
    let dataStore = new DataStore();
    this.setState({
      isLoading: true
    });
    dataStore.fetchData(url)
      .then((data) => {
        console.log(data.items);
        this.setState({
          data: this.pageCount === 1 ? [...data.items] : [...this.state.data, ...data.items],
          isLoading: false
        });
        this.pageCount ++;
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.log(error);
      })
  };

  render () {
    let {theme} = this.routeParams.theme;
    return (
      <View style={{flex: 1}}>
        {this.renderNavigationBar()}
        {
          this.state.inputKey && !this.state.data.length && this.state.isLoading ?
          this._renderLoadingComponent() : null
        }
        {
          this.state.data.length ?
          <FlatList
            data={this.state.data}
            renderItem={data => this.renderItem(data)}
            keyExtractor={item => `${item.id}`}
            refreshControl={
              <RefreshControl
                title={'Loading'}
                titleColor={theme}
                colors={[theme]}
                refreshing={this.state.isLoading}
                onRefresh={() => {
                  this.pageCount = 1;
                  this.isCanLoadMore = false;
                  this.pullData();
                }
                }
                tintColor={theme}
              />
            }
            onEndReached={() => {
                console.log('---onEndReached----');
                if (this.isCanLoadMore && !this.state.isLoading) {
                  this.pullData();
                }
              }
            }
            onEndReachedThreshold={0.1}
            ListFooterComponent={this._renderListFootComponent}
            // ListEmptyComponent={this._renderEmptyComponent}
            onMomentumScrollBegin={ () => {
              console.log('触发滚动动画');
              // 滚动动画开始时调用此函数。
              this.isCanLoadMore = true;
            }}
          /> : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputViewContainer: {
    flex: 1,
    flexDirection: 'row',
    height: (Platform.OS === 'ios') ? 26 : 36,
    backgroundColor: 'white',
    // marginTop: 10,
    borderRadius: 3,
    overflow: 'hidden',
    // position: 'none'
    // left: 0,
    // right: 40,
    // top: 10,
    // bottom: 0
  },
  textInput: {
    flex: 1,
    // width: '100%',
    height: (Platform.OS === 'ios') ? 26 : 36,
    borderWidth: (Platform.OS === 'ios') ? 1 : 0,
    borderColor: "white",
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    // marginRight: 10,
    // marginLeft: 10,
    borderRadius: 3,
    opacity: 0.7,
    color: '#666',
    backgroundColor: 'white'
  }
});
