import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import CustomPage from './my/customThemePage';
import {connect} from 'react-redux';
import {onThemeChange} from '../action/theme';

type Props = {};
class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
    console.log(this.props, 'homepage');
  }

  render() {
    console.log(this.props.navigation);
    NavigationUtil.navigation = this.props.navigation; // 保存外层导航容器的navigation，以便内层的导航容器跳转外层的导航容器，不然内层的无法跳外层的
    // const Tab = this._tabNavigator();
    return (
      <View style={styles.container}>
        <DynamicTabNavigator />
        <CustomPage onThemeChange={this.props.onThemeChange} visible={this.props.isShowCustomThemeView}  />
      </View>

    )
  }
}

const mapStateToProps = state => (
  {
    isShowCustomThemeView: state.theme.isShowCustomThemeView
  }
);

const mapDispatchToProps = dispatch => {
  return {
    onThemeChange: status => {
      console.log(status, 'sss');
      dispatch(onThemeChange(status));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
