import React, {Component} from 'react';
import {Text, View, StyleSheet, DeviceInfo, TouchableOpacity, BackHandler, Platform} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../navigator/NavigationUtil';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import GlobalStyle from '../data/globalStyles';

const TRENDING_URL = 'https://github.com/';

type Props = {}
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.routeParams = this.props.navigation.state.params;
    const {projectModel} = this.routeParams;
    const title = projectModel.full_name || projectModel.name;
    this.state = {
      title: title,
      url: projectModel.html_url ? projectModel.html_url : `${TRENDING_URL}${title}`
    };
  }

  // 处理安卓物理返回键
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  };

  renderLeftBtn = () => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => NavigationUtil.goBack(this.props.navigation)}
      >
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: 'white'}}/>
      </TouchableOpacity>
    )
  };

  renderRightBtn = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          underlayColor={'transparent'}
        >
          <FontAwesome
            name={this.state.isFavorite ? 'star' : 'star-o'}
            size={20}
            style={{color: 'white', marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor={'transparent'}
        >
          <Ionicons
            name={'md-share'}
            size={20}
            style={{opacity: 0.9, marginRight: 10, color: 'white'}}/>
        </TouchableOpacity>
      </View>
    )
  };

  renderNavigationBar = () => {
    const {theme} = this.routeParams.theme;
    const statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    return (
      <NavigationBar
        title={this.state.title}
        statusBar={statusBar}
        style={{backgroundColor: theme}}
        leftButton={this.renderLeftBtn()}
        rightButton={this.renderRightBtn()}
      />
    )
  };

  render() {
    const {theme} = this.routeParams.theme;
    return (
      <SafeAreaViewPlus
        topColor={theme}
        style={GlobalStyle}
        bottomInset={true}
      >
        {this.renderNavigationBar()}
        <WebView
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          // contentInset={{top: 50, left: 0, bottom: 0, right: 0}}
          style={{flex: 1, zIndex:-1}}
          source={{uri: this.state.url}}
        />
      </SafeAreaViewPlus>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
