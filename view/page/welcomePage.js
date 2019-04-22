import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
// import SplashScreen from 'react-native-splash-screen';
// import {AsyncStorage} from 'react-native';
import DataStore from '../expand/dao/dataStore';
import {lang, defaultLang} from './my/lang';
import GuideSwiper from '../common/Swiper';

type Props = {}
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    // let dataStore = new DataStore();
    // dataStore.getData('Language_Custom').then((data) => {
    //   // console.log(data); // 为空时，返回null
    //   if (!data) {
    //     dataStore.saveData('Language_All', JSON.stringify(defaultLang), (error) => {
    //       if (error) {
    //         console.log('所有语言存储失败');
    //         throw new Error(error);
    //       } else {
    //         console.log('所有语言存储成功');
    //       }
    //     });
    //   }
    // });
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

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

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
