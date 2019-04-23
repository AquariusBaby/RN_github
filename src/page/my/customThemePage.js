import React, {Component} from 'react';
import {View, Text, Modal, ScrollView, DeviceInfo, TouchableHighlight, StyleSheet, Platform} from 'react-native';
import ThemeFlags from '../../data/theme';

export default class CustomThemePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ThemeArr: {}
    }
  }

  onSelectTheme = (themeKey) => {
    this.props.onThemeChange(this.state.ThemeArr[themeKey]);
  };

  getThemeItem = (themeKey) => {
    return (
      <TouchableHighlight
        style={{flex: 1}}
        underlayColor={'white'}
        onPress={() => {this.onSelectTheme(themeKey)}}
      >
        <View style={[{backgroundColor: this.state.ThemeArr[themeKey]}, styles.themeText]}>
          <Text style={styles.themeItem}>{themeKey}</Text>
        </View>
      </TouchableHighlight>
    )
  };

  renderThemeItems = () => {
    const views = [];
    console.log(this.state);
    for (let i = 0, keys = Object.keys(this.state.ThemeArr), len = keys.length; i < len; i += 3) {
      const key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
      views.push(
        <View key={i} style={{flexDirection: 'row'}}>
          {this.getThemeItem(key1)}
          {this.getThemeItem(key2)}
          {this.getThemeItem(key3)}
        </View>
      )
    }
    return views;
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        ThemeArr: {...ThemeFlags}
      })
    }, 0)
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => { // 会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发
          this.props.onClose();
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            {this.renderThemeItems()}
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  themeText: {
    flex: 1,
    height: 120,
    lineHeight: 120,
    margin: 3,
    padding: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  themeItem: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
    marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // backgroundColor: 'transparent',
    padding: 3
  }
});
