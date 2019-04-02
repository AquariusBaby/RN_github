import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux';
import {MORE_MENU} from './moreMenu';
import {onShowCustomThemeView} from '../../action/theme';

type Props = {};
class MyPage extends Component<Props> {
  constructor(props) {
    super(props);
    // this.backPress =
  }

  componentDidMount() {

  }

  onClick(menu, type) {
    const {theme} = this.props;
    let RouteName = null;
    let params = null;
    switch(type) {
      // case MORE_MENU.Tutorial:
      //   RouteName = 'WebViewPage';
      //   break;
      case 'About_Info':
        RouteName = 'AboutPage';
        params = {
          title: 'AboutPage',
          theme: theme
        };
        break;
      // 自定义主题
      case 'Custom_Theme':
        const {onShowCustomThemeView} = this.props;
        onShowCustomThemeView(true);
        break;
      case 'CodePush':
        RouteName = 'CodePushPage';
        params = {
          title: 'CodePushPage',
          theme: theme
        };
        break;
      // 标签排序
      case 'Sort_Key':
        RouteName = 'SortKeyPage';
        params = {
          title: 'SortKeyPage',
          theme: theme
        };
        break;
      // 语言排序
      // case 'SortKeyPage':
      //   RouteName = 'SortKeyPage';
      //   params = {
      //     title: 'SortKeyPage',
      //     theme: theme
      //   };
      //   break;
      // 标签管理
      case 'Custom_Key':
      case 'Remove_Key':
        RouteName = 'CustomKeyPage';
        params = {
          title: 'CustomKeyPage',
          theme: theme,
          isRemoveKey: type === 'Remove_Key'
        };
        break;
      // 关于作者
      case 'AboutMePage':
        RouteName = 'AboutMePage';
        params = {
          title: 'AboutMePage',
          theme: theme
        };
        break;
    }

    RouteName && NavigationUtil.goToPage(params, RouteName);
  }

  getItem = (callBack, color, name, Icons, icon, expandableIc = null) => {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        style={styles.item_container}
        onPress={callBack}
      >
        <View style={styles.about_left}>
          {
            Icons && icon ?
              <Icons
                name={icon}
                size={16}
                style={{color: color, marginRight: 10}}
              /> :
              <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
          }
          <Text>{name}</Text>
        </View>
        <Ionicons
          name={expandableIc ? expandableIc : 'ios-arrow-forward'}
          size={16}
          style={{
            marginRight: 10,
            alignSelf: 'center',
            color: theme || 'black',
          }}/>
      </TouchableOpacity>
    )
  };

  render() {
    let {theme} = this.props;
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content',
    };
    console.log(theme,MORE_MENU.Tutorial);
    let navigationBar = (
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{backgroundColor: theme}}
      />
    );
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity style={styles.item} onPress={() => this.onClick(MORE_MENU.About, 'About_Info')}>
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  color: theme,
                }}
              />
              <Text>GitHub Popular</Text>
            </View>
            <Ionicons
              name={'ios-arrow-forward'}
              size={16}
              style={{
                marginRight: 10,
                alignSelf: 'center',
                color: theme,
              }}/>
          </TouchableOpacity>
          {/*<View style={styles.line}/>*/}
          {/*{this.getItem(() => {}, theme, MORE_MENU.Tutorial.name,  MORE_MENU.Tutorial.Icons,  MORE_MENU.Tutorial.icon)}*/}
          <Text style={styles.groupTitle}>标签管理</Text>
          {this.getItem(() => this.onClick(MORE_MENU.Custom_Key, 'Custom_Key'), theme, MORE_MENU.Custom_Key.name, MORE_MENU.Custom_Key.Icons, MORE_MENU.Custom_Key.icon)}
          <View style={styles.line}/>
          {this.getItem(() => this.onClick(MORE_MENU.Sort_Key, 'Sort_Key'), theme, MORE_MENU.Sort_Key.name, MORE_MENU.Sort_Key.Icons, MORE_MENU.Sort_Key.icon)}
          <View style={styles.line}/>
          {this.getItem(() => this.onClick(MORE_MENU.Remove_Key, 'Remove_Key'), theme, MORE_MENU.Remove_Key.name, MORE_MENU.Remove_Key.Icons, MORE_MENU.Remove_Key.icon)}
          {/*<View style={styles.line}/>*/}
          {/*<Text style={styles.groupTitle}>趋势管理</Text>*/}
          {/*{this.getItem(() => {}, theme, MORE_MENU.Custom_Language.name,  MORE_MENU.Custom_Language.Icons,  MORE_MENU.Custom_Language.icon)}*/}
          {/*<View style={styles.line}/>*/}
          {/*{this.getItem(() => {}, theme, MORE_MENU.Sort_Language.name,  MORE_MENU.Sort_Language.Icons,  MORE_MENU.Sort_Language.icon)}*/}
          {/*<View style={styles.line}/>*/}
          <Text style={styles.groupTitle}>设置</Text>
          {this.getItem(() => this.onClick(MORE_MENU.Custom_Theme, 'Custom_Theme'), theme, MORE_MENU.Custom_Theme.name,  MORE_MENU.Custom_Theme.Icons,  MORE_MENU.Custom_Theme.icon)}
          <View style={styles.line}/>
          {this.getItem(() => {}, theme, MORE_MENU.About_Author.name,  MORE_MENU.About_Author.Icons,  MORE_MENU.About_Author.icon)}
          <View style={styles.line}/>
          {this.getItem(() => {}, theme, MORE_MENU.Feedback.name,  MORE_MENU.Feedback.Icons,  MORE_MENU.Feedback.icon)}
          <View style={styles.line}/>
          {this.getItem(() => {}, theme, MORE_MENU.CodePush.name,  MORE_MENU.CodePush.Icons,  MORE_MENU.CodePush.icon)}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onShowCustomThemeView: (status) => {
      dispatch(onShowCustomThemeView(status));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: '#f3f3f4',
  },
  item_container: {
    backgroundColor: 'white',
    padding: 10, height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
});
