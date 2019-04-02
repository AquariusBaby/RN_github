import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import {lang, defaultLang} from './lang';
import DataStore from '../../expand/dao/dataStore';
import {connect} from 'react-redux';

class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // langKeys: [...lang]
      langKeys: []
    };
  }

  componentDidMount() {
    // console.log(DataStore);
    // DataStore.saveData('all_language', lang, (error, result) => {
    //   this.state.langKeys = [...lang];
    // });
    let {isRemoveKey} = this.props.navigation.state.params;
    let dataStore = new DataStore();
    dataStore.getData('Language_All').then((data) => {
      if (!data) {
        if (isRemoveKey) {
          let checkedList = defaultLang.filter((item) => item.checked);
          this.setState({
            langKeys: [...checkedList]
          });
          return ;
        }
        this.setState({
          langKeys: [...defaultLang]
        })
      } else {
        let storeData = JSON.parse(data.data);
        if (isRemoveKey) {
          let checkedList = storeData.filter((item) => item.checked);
          this.setState({
            langKeys: [...checkedList]
          });
          return ;
        }
        // console.log(this.state.langKeys, typeof data.data, JSON.parse(data.data));
        this.setState({
          langKeys: [...storeData]
        })
      }
    }).catch((error) => {
      // console.log(error, 'error');
    })
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
    console.log('render');
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
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    allLanguage: state.Language
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeCustomKey: (status) => {
      dispatch(changeCustomKey(status));
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
