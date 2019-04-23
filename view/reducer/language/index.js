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
    case Types.SORT_CUSTOM_LANGUAGE:
      // state.customLanguage.map((item, index) => {
      //   if (item.checked) {
      //
      //   }
      // });
      function clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i = 0, l = from.length; i < l; i++) {
          newArray[i] = from[i];
        }
        return newArray;
      }
      let cloneArr = clone(state.customLanguage);
      let j = 0;
      for (let i = 0, len = cloneArr.length; i < len; i++) {
        if (cloneArr[i].checked) {
          cloneArr[i] = action.arr[j];
          j++;
        }
      }
      return {
        customLanguage: cloneArr
      };
    default:
      return state;
  }
}
