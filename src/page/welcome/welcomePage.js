import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import SplashScreen from 'react-native-splash-screen';
// import {AsyncStorage} from 'react-native';
import DataStore from '../../expand/dao/dataStore';
import {lang, defaultLang} from '../../data/lang';
import GuideSwiper from './tmp/Swiper';

type Props = {}
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    let dataStore = new DataStore();
    dataStore.getData('Is_First').then((data) => {
      console.log(data);
      if (!data) {
        dataStore.saveData('Is_First', JSON.stringify({isFirst: false}), (error) => {
          if (error) {
            // console.log('存储判断是否为初次打开');
            throw new Error(error);
          } else {
            console.log('存储判断是否为初次打开');
          }
          SplashScreen.hide();
        });
      } else {
        // 存在，则表示不是第一次打开
        NavigationUtil.resetToHomePage({
          navigation: this.props.navigation
        });
        SplashScreen.hide();
      }
    });
    // this.timer = setTimeout(() => {
    //   SplashScreen.hide();
    // }, 200);
  }

  // 开启旅行
  getStart = (customLanguage) => {
    // console.log(customLanguage);
    let dataStore = new DataStore();
    dataStore.saveData('Language_Custom', JSON.stringify(customLanguage), (error) => {
      if (error) {
        console.log('自定义语言存储失败');
        throw new Error(error);
      } else {
        console.log('自定义语言存储成功');
      }

      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      });
    });

  };

  jumpSelect = () => {
    // console.log(customLanguage);
    let dataStore = new DataStore();
    dataStore.saveData('Language_Custom', JSON.stringify(defaultLang), (error) => {
      if (error) {
        console.log('默认语言存储失败');
        throw new Error(error);
      } else {
        console.log('默认语言存储成功');
      }

      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      });
    });

  };

  // componentWillUnmount() {
    // this.timer && clearTimeout(this.timer);
  // }

  render() {
    return (
      <View style={styles.container}>
        <GuideSwiper getStart={this.getStart} jumpSelect={this.jumpSelect} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
