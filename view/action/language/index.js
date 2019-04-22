import Types from '../types';
import DataStore from '../../expand/dao/dataStore';
// import

export function initCustomLanguage() {

  return dispatch => {
    let dataStore = new DataStore();

    dataStore.getData('Language_Custom').then(result => {
      let customLanguage = JSON.parse(result.data);
      // console.log(customLanguage, 'action');
      // return state;
      // return {
      //   type: Types.GET_CUSTOM_LANGUAGE,
      //   customLanguage: customLanguage
      // }
      dispatch({
        type: Types.INIT_CUSTOM_LANGUAGE,
        customLanguage: customLanguage
      })
    }).catch((error) => {
      console.log(error, 'action');
      // return {
      //   type: Types.GET_CUSTOM_LANGUAGE,
      //   customLanguage: []
      // }
      dispatch({
        type: Types.INIT_CUSTOM_LANGUAGE,
        customLanguage: []
      })
    });
  }
}

export function toggleCustomLanguage(index) {
  return {
    type: Types.TOGGLE_CUSTOM_LANGUAGE,
    index
  }
}
