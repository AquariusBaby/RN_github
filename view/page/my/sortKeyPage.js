import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,TouchableHighlight} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SortableListView from 'react-native-sortable-listview';
import {defaultLang} from './lang';

export default class SortKeyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedArr: []
    }
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

  renderRightBtn = () => {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingRight: 12}}
        onPress={() => {}}
      >
        <Text style={{fontSize: 17, color: '#fff'}}>保存</Text>
      </TouchableOpacity>
    )
  };

  componentDidMount () {
    let arr = defaultLang.filter((item, index, arr) => {
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
      <View style={styles.container}>
        {navigationBar}
        <SortableListView
          data={this.state.checkedArr}
          order={Object.keys(this.state.checkedArr)}
          onRowMoved={
            e => {
              // console.log(e.from, e.to);
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
      </View>
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