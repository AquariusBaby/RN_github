import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,TouchableHighlight, Alert, BackHandler} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SortableListView from 'react-native-sortable-listview';
import Toast, {DURATION} from 'react-native-easy-toast';
// import {defaultLang} from './lang';
import {connect} from 'react-redux';
import {sortCustomLanguage} from '../../action/language';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';
import GlobalStyle from '../../data/globalStyles';
import BackPressComponent from '../../common/BackPressComponent';

class SortKeyPage extends Component {
  constructor(props) {
    super(props);
    this.isSaved = false;
    this.isChange = false;
    this.state = {
      checkedArr: []
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

  renderLeftBtn = () => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => this.leftClick()}
      >
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
    )
  };

  renderRightBtn = () => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingRight: 12}}
        onPress={() => this.onSave(true)}
      >
        <Text style={{fontSize: 17, color: '#fff'}}>保存</Text>
      </TouchableOpacity>
    )
  };

  leftClick = () => {
    if (!this.isChange) {
      NavigationUtil.goBack(this.props.navigation);
      return ;
    }
    !this.isSaved ?
      Alert.alert('提示', '要保存修改吗？', [
        {
          text: '否',
          onPress: () => {
            NavigationUtil.goBack(this.props.navigation)
          }
        },
        {
          text: '是',
          onPress: () => {
            this.onSave(() => NavigationUtil.goBack(this.props.navigation));
          }
        }
      ]) :
      NavigationUtil.goBack(this.props.navigation)
  };

  onSave = (callback) => {
    this.isSaved = true;
    this.toast.show('保存成功', 300, () => {callback && callback();});
    // this.state.checkedArr
    this.props.sortCustomLanguage(this.state.checkedArr);
  };

  componentDidMount () {
    // 处理安卓物理返回键
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // console.log(this.props);
    let {customLanguage} = this.props;
    let arr = customLanguage.filter((item, index, arr) => {
      return item.checked === true
    });

    this.setState({
      checkedArr: [...arr]
    })
    // console.log(checkedArr);
  }

  render() {
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
        rightButton={this.renderRightBtn()}
      />
    );
    return (
      <SafeAreaViewPlus
        topColor={theme}
        style={GlobalStyle}
        bottomInset={true}
      >
        {navigationBar}
        <SortableListView
          data={this.state.checkedArr}
          order={Object.keys(this.state.checkedArr)}
          onRowMoved={
            e => {
              // console.log(e.from, e.to);
              this.isChange = true;
              this.isSaved = false;
              this.state.checkedArr.splice(e.to, 0, this.state.checkedArr.splice(e.from, 1)[0]);
              // this.forceUpdate();
              this.setState({
                checkedArr: this.state.checkedArr
              });
              // console.log(this.state.checkedArr);
            }
          }
          renderRow={row => <SortCell data={row} theme={theme} />}
        />
        <Toast
          ref={toast => this.toast = toast}
          style={{backgroundColor: '#000000', padding: 10}}
          position='center'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.4}
          textStyle={{color:'#fff'}}
        />
      </SafeAreaViewPlus>
    )
  }
}

class SortCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme} = this.props;
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={this.props.data.checked ? styles.item : styles.hidden}
        {...this.props.sortHandlers}
      >
        <View style={{marginLeft: 10, flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name={'sort'}
            size={16}
            style={{marginRight: 10, color: theme}}/>
          <Text>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customLanguage: state.language.customLanguage
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    sortCustomLanguage(arr) {
      dispatch(sortCustomLanguage(arr))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SortKeyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // item: {
  //   height: 40,
  //   flexDirection: 'row',
  // },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: '#999',
  },
  hidden: {
    height: 0
  },
  item: {
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 50,
    justifyContent: 'center'
  },
});
