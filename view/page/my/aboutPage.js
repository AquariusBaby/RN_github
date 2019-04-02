import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, DeviceInfo, Platform} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MORE_MENU } from './moreMenu';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const window = Dimensions.get('window');
const AVATAR_SIZE = 90; // 头像大小
const PARALLAX_HEADER_HEIGHT = 270; // parallax头部高度
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
// const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? 44 + TOP : 50;

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  getParallaxRenderConfig = (params) => {
    let config = {};
    let avatar = typeof params.avatar === 'string' ? {uri: params.avatar} : params.avatar;
    // 这里渲染背景的
    config.renderBackground = () => (
      <View key="background">
        <Image
          source={{
            uri: params.backgroundImg,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT,
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}
        />
      </View>
    );
    // 这里渲染背景上面你想要展示的字
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <View>
          <Image style={styles.avatar} source={avatar}/>
        </View>
        <View>
          <Text style={styles.sectionSpeakerText}>{params.name}</Text>
        </View>
        <View>
          <Text style={styles.sectionTitleText}>{params.description}</Text>
        </View>
      </View>
    );
    // 这里是向上拖到顶部，顶部展示的视图
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );
    // 这里是顶部固定栏，一般是导航栏
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {this.renderLeftBtn()}
        {this.renderShareBtn()}
      </View>
    );

    return config;
  };



  renderLeftBtn = () => {
    // console.log(this.props.navigation, NavigationUtil);
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => NavigationUtil.goBack(this.props.navigation)}
      >
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
    )
  };

  renderShareBtn = () => {
    return (
      <TouchableOpacity
        underlayColor={'transparent'}
        onPress={() => {}}
      >
        <Ionicons
          name={'md-share'}
          size={20}
          style={{opacity: 0.9, marginRight: 10, color: 'white'}}
        />
      </TouchableOpacity>
    )
  };

  ParallaxRender(contentView, params) {
    const {theme} = this.props;
    const renderConfig = this.getParallaxRenderConfig(params);
    return (
      <ParallaxScrollView
        backgroundColor={theme}
        contentBackgroundColor={'#f5f5f5'}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        {...renderConfig}
      >
        {contentView}
      </ParallaxScrollView>
    )
  };

  render() {
    // let {title, theme} = this.props.navigation.state.params;
    // let statusBar = {
    //   backgroundColor: theme,
    //   barStyle: 'light-content',
    // };
    // let navigationBar = (
    //   <NavigationBar
    //     title={title}
    //     statusBar={statusBar}
    //     style={{backgroundColor: theme}}
    //     leftButton={this.renderLeftBtn()}
    //   />
    // );
    const contentView = (
      <View>
        <Text style={styles.item}>西兰花蔡</Text>
        <Text style={styles.item}>1.redux-thunk的使用</Text>
        <Text style={styles.item}>2.取消异步任务的思考与实现</Text>
        <Text style={styles.item}>3.react-native-event-bus的使用</Text>
        <Text style={styles.item}>4.react-navigation-redux-helpers的使用</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        {/*{navigationBar}*/}
        {
          this.ParallaxRender(contentView, {
            "name": "GitHub Popular",
            "description": "这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。",
            "avatar": "http://www.devio.org/io/GitHubPopular/img/ic_app.png",
            "backgroundImg": "http://www.devio.org/io/GitHubPopular/img/for_githubpopular_about_me.jpg"
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 10
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    paddingTop:TOP
  },
  item: {
    height: 45,
    lineHeight: 45,
    fontSize: 17,
    padding: 5
  }
});
