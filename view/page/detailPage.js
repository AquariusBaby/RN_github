import React, {Component} from 'react';
import {Text, View, StyleSheet, DeviceInfo, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../navigator/NavigationUtil';

const TRENDING_URL = 'https://github.com/';

type Props = {}
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.routeParams = this.props.navigation.state.params;
    const {projectModel} = this.routeParams;
    const title = projectModel.name;
    this.state = {
      title: title,
      url: `${TRENDING_URL}${title}`
    }
  }

  renderLeftBtn = () => {
    // console.log(this.props.navigation, NavigationUtil);
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => NavigationUtil.goBack(this.props.navigation)}
        // onPress={() => console.log(this.props.navigation, NavigationUtil)}
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
    let {theme} = this.routeParams.theme;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
      hidden: false
    };
    return (
      <NavigationBar
        title={this.state.title}
        statusBar={statusBar}
        // style={theme}
        style={{backgroundColor: theme}}
        leftButton={this.renderLeftBtn()}
        rightButton={this.renderRightBtn()}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}
        {/*<Text>{this.state.title}</Text>*/}
        <WebView
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          style={{flex: 1}}
          source={{uri: this.state.url}}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // paddingTop: DeviceInfo.isIPhoneX_deprecated ? 20 : 0
  }
});
