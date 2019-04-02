import Types from '../types';
import DataStore from '../../expand/dao/dataStore';

export function onLoadPopularData(obj) {
  // return dispatch => {
  //   dispatch({
  //     type: Types.POPULAR_REFRESH,
  //     storeName: storeName
  //   });
  //   let dataStore = new DataStore();
  //   dataStore.fetchData(url)
  //     .then(data => {
  //       handleData(dispatch, storeName, data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       dispatch({
  //         type: Types.LOAD_POPULAR_FAIL,
  //         storeName,
  //         error
  //       })
  //     })
  // }
  return obj;
  // let dataStore = new DataStore();
  // dataStore.fetchData(url)
  //   .then(data => {
  //     console.log(data, url, 'aaa');
  //     // handleData(dispatch, storeName, data);
  //     return {
  //       type: Types.LOAD_POPULAR_SUCCESS,
  //       items: data && data.data && data.data.items,
  //       storeName
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     return {
  //       type: Types.LOAD_POPULAR_FAIL,
  //       storeName,
  //       error
  //     }
  //   })
}

function handleData(dispatch, storeName, data) {
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}
