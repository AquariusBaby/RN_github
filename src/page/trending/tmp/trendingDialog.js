import React, {Component} from 'react';
import {Modal, Text, StatusBar, StyleSheet, View, Platform, TouchableOpacity, DeviceInfo, TouchableHighlight} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const timeOptions = [{text: '今天', key: 'daily'}, {text: '本周', key: 'weekly'}, {text: '本月', key: 'monthly'}];
export default class TrendingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  show() {
    this.setState({
      visible: true
    })
  }

  hide() {
    this.setState({
      visible: false
    })
  }

  render() {
    const {onSelect} = this.props;
    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => this.hide()}
        animationType={'none'}
      >
        <TouchableHighlight
          style={styles.container}
          onPress={() => onSelect()}
        >
          <View style={styles.content}>
            <MaterialIcons
              name={'arrow-drop-up'}
              size={36}
              style={styles.arrow}
            />
            {
              timeOptions.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    underlayColor='transparent'
                    onPress={() => onSelect(item)}
                  >
                    <View style={styles.text_container}>
                      <Text style={styles.text}>{item.text}</Text>
                      {
                        index !== timeOptions.length -1 ?
                          <View style={styles.line} /> :
                          null
                      }
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </TouchableHighlight>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
    paddingTop: DeviceInfo.isIPhoneX_deprecated ? 15 : 0
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -15,
    marginLeft: 24
  },
  content: {
    // backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26
  },
  line: {
    height: 0.3,
    backgroundColor: '#999999',
  },
});
