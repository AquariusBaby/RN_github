import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage, BackHandler} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
// import {lang, defaultLang} from '../../data/lang';
// import DataStore from '../../expand/dao/dataStore';
import {connect} from 'react-redux';
import {toggleCustomLanguage} from '../../action/language';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';
import GlobalStyle from '../../data/globalStyles';
import BackPressComponent from '../../common/BackPressComponent';

class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langKeys: []
    };
    // 处理安卓物理返回键
    // this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)})
  }

  // 处理安卓物理返回键
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  };

  componentDidMount() {
    // 处理安卓物理返回键
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    let {isRemoveKey} = this.props.navigation.state.params;

    // 此处加个延迟优化点进来时出现的卡顿（数据渲染太多）
    setTimeout(() => {
      const customLanguage = this.props.customLanguage;
      let checkedList = isRemoveKey ? customLanguage.filter((item) => item.checked) : customLanguage;

      this.setState({
        langKeys: [...checkedList]
      });
    }, 0);

  }

  renderLeftBtn = () => {
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

  _checkedImage(checked) {
    const {theme} = this.props.navigation.state.params;
    return <Ionicons
      name={checked ? 'ios-checkbox' : 'md-square-outline'}
      size={20}
      style={{
        color: theme,
      }}/>
  }

  onClick = (data, index) => {
    // 添加/取消一门语言
    this.props.toggleCustomLanguage(index);

    data.checked = !data.checked;
    this.setState({
      langKeys: this.state.langKeys
    })
  };

  renderCheckBox = (data, index) => {
    return (
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={() => this.onClick(data, index)}
        isChecked={data.checked}
        leftText={data.name}
        checkedImage={this._checkedImage(true)}
        unCheckedImage={this._checkedImage(false)}
      />
    )
  };

  renderContent = () => {
    let len = this.state.langKeys.length;
    let views = [];
    let {isRemoveKey} = this.props.navigation.state.params;
    // console.log(len, 'qqq');
    for (let i = 0, l = len; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.langKeys[i], i)}
            {i + 1 < len ? this.renderCheckBox(this.state.langKeys[i + 1], i + 1) : <View style={{flex: 1, padding: 10}} />}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    return views;
  };

  render() {
    // console.log('render');
    let {title, theme} = this.props.navigation.state.params;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={title}
        statusBar={statusBar}
        style={{backgroundColor: theme}}
        leftButton={this.renderLeftBtn()}
      />
    );
    return (
      <SafeAreaViewPlus
        topColor={theme}
        style={GlobalStyle}
        bottomInset={true}
      >
        {navigationBar}
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
      </SafeAreaViewPlus>
    )
  }
}

const mapStateToProps = state => {
  return {
    customLanguage: state.language.customLanguage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCustomLanguage: (index) => {
      dispatch(toggleCustomLanguage(index));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomKeyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: 40,
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: '#999',
  }
});
