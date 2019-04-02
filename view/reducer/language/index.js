import Types from '../../action/types';
import {AsyncStorage} from 'react-native';

const defaultState = {
  language: [],
  customKeys: []
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.INIT_LANGUAGE:
      let getLanguage = AsyncStorage.getItem('ALL_LANGUAGE');
      let getCustomKeys = AsyncStorage.getItem('CUSTOM_KEYS');

      Promise.all([getLanguage, getCustomKeys]).then(([language, customKeys]) => {
        state = {language, customKeys};
        // state.language = language;
        // state.customKeys = customKeys;
        return state;
      }).catch((error) => {
        console.log(error);
      });
      // return {
      //   ...state
      // };
    default:
      return state;
  }
}
