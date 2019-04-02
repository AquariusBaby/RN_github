import Types from '../../action/types';
import {StyleSheet} from 'react-native';

const defaultState = {
  theme: '#2196F3',
  isShowCustomThemeView: false,
  styles: StyleSheet.create({
    selectedTitleStyle: {
      color: '#2196F3'
    },
    tabBarSelectedIcon: {
      tintColor: '#2196F3'
    },
    navBar: {
      backgroundColor: '#2196F3'
    }
  })
};

export default function (state = defaultState, action) {
    switch (action.type) {
      case Types.THEME_CHANGE:
        return {
          theme: action.theme,
          isShowCustomThemeView: false
        };
      case Types.THEME_INIT:
        return {
          theme: action.theme
        };
      case Types.ON_SHOW_CUSTOM_THEME_View:
        return {
          isShowCustomThemeView: action.status
        };
      default:
        // console.log(state, "sss");
        return state;
    }
}
