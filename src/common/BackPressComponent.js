import React from 'react';
import {BackHandler} from 'react-native';

// Android物理回退键处理
export default class BackPressComponent {
  constructor(props) {
    this._hardwareBackPress = this.onHardwareBackPress.bind(this);
    this.props = props;
  }

  componentDidMount() {
    this.props.backPress && BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
  }

  componentWillUnmount() {
    this.props.backPress && BackHandler.removeEventListener('hardwarePress', this._hardwareBackPress);
  }

  onHardwareBackPress(e) {
    return this.props.backPress(e);
  }
}
