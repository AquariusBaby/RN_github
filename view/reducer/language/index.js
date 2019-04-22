import Types from '../../action/types';
// import {AsyncStorage} from 'react-native';
// import DataStore from '../../expand/dao/dataStore';

const defaultState = {
  customLanguage: []
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case Types.INIT_CUSTOM_LANGUAGE:
      // return {
      //   customLanguage: action.customLanguage
      // };
      return {
        ...state,
        customLanguage: action.customLanguage
      };
      // break;
    case Types.TOGGLE_CUSTOM_LANGUAGE:
      let {customLanguage} = state;
      let obj = customLanguage.map((item, index) => index === action.index ? {...item, checked: !item.checked} : item);
      return {
        ...state,
        obj
      };
    default:
      return state;
  }
}
