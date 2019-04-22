import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {lang, defaultLang} from '../page/my/lang';

export default class GuideSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestTag: [],
      selectTagArr: []
    }
  }

  _randomLanguage() {
    // let len = lang.length;
    let languageArr = [...lang];

    languageArr.sort(() => (Math.random() - 0.5));
    // this.state.interestTag = languageArr.slice(0, len / 2);
    this.setState({
      interestTag: languageArr.slice()
    })
  }

  // 添加标签
  addTag = (item, index) => {
    item.checked = !item.checked;
    if (item.checked) {
      this.state.selectTagArr.push(item.name);
    } else {
      let position = this.state.selectTagArr.indexOf(item.name);
      if (position > -1) {
        this.state.selectTagArr.splice(position, 1);
      }
    }
    this.setState({
      selectTagArr: this.state.selectTagArr,
      interestTag: this.state.interestTag
    })
  };

  // 跳过
  jumpSelect = () => {
    // 直接跳过的，那就给来个默认的选择 defaultLang
    this.props.jumpSelect();
  };

  // 开始旅行
  getStart = () => {
    if (this.state.selectTagArr.length < 4) {
      return;
    }
    this.props.getStart(this.state.interestTag);
  };

  componentDidMount() {
    this._randomLanguage();
  }

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>
            <Text>开始旅行</Text>
          </Text>
        </View>
        <View style={styles.slide2}>
          <TouchableOpacity style={{width: '100%', height: 30, lineHeight: 30, marginTop: 40, flexDirection: 'row', alignItem: 'center', justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 16, color: '#999', padding: 5}} onPress={() => this.jumpSelect()}>跳过</Text>
            <Ionicons
              name={'ios-arrow-forward'}
              size={16}
              style={{
                // marginLeft: 5,
                padding: 5,
                paddingLeft: 0,
                // alignSelf: 'center',
                color: '#999',
              }}/>
          </TouchableOpacity>
          <View style={styles.tips}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#607D8B',shadowColor: 'gray', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.5, shadowRadius: 2, backgroundColor: 'transparent',}}>探索感兴趣的圈子</Text>
            <Text style={{fontSize: 15, color: '#999', marginTop: 10, shadowColor: 'gray', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.5, shadowRadius: 2, backgroundColor: 'transparent',}}>获取个性化的内容推荐</Text>
            {/*<View style={styles.line} />*/}
          </View>
          <ScrollView>
            <View style={{ flexDirection: 'row', flexWrap:'wrap'}}>
            {
              this.state.interestTag.map((item, index) => {
                // let widthText = item.name.length * 13;
                let background = item.checked ? '#E91E63' : '#fff';
                let fontColor = item.checked ? '#fff' : '#333';
                // if (widthText < 45) {
                //   widthText = 45;
                // }
                return (
                  <TouchableOpacity key={index} style={[styles.tag, {backgroundColor: background, paddingHorizontal: 15}]} onPress={() => this.addTag(item, index)}>
                    <Text style={{ fontSize: 13, color: fontColor,  textAlign: 'center'}}>{item.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
            </View>
          </ScrollView>
          <TouchableOpacity
            style={[styles.begin_btn, {backgroundColor: this.state.selectTagArr.length < 4 ? '#c7c7c7' : '#2196F3'}]}
            onPress={() => this.getStart()}
          >
            <Text style={{fontSize: 18, color: 'white', lineHeight: 45, textAlign: 'center',}}>
              {this.state.selectTagArr.length < 4 ? '选择4个你感兴趣的标签' : '开启旅行'}
            </Text>
          </TouchableOpacity>
        </View>
        {/*<View style={styles.slide2}>*/}
          {/*<Text style={styles.text}>456</Text>*/}
        {/*</View>*/}
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 40
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tips: {
    // flex: 1,
    width: '100%',
    marginTop: 35,
    paddingBottom: 20,
    // textAlign: 'left'
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 15,
    // shadowColor: 'gray',
    // shadowOffset: {width: 2, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // backgroundColor: 'transparent',
  },
  // line: {
  //   // padding: 5,
  //   height: 0.5,
  //   opacity: 0.9,
  //   backgroundColor: '#f3f3f4',
  //   shadowColor: 'gray',
  //   shadowOffset: {width: 2, height: 2},
  //   shadowOpacity: 0.5,
  //   shadowRadius: 2,
  //   marginTop: 10
  // },
  tag: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    margin: 10,
  },
  begin_btn: {
    width: '95%',
    height: 45,
    // lineHeight: 45,
    // textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    // marginLeft: 25,
    // marginRight: 25,
    borderRadius: 5,
    overflow: 'hidden',
    // backgroundColor: '#2196F3',
  }
});
