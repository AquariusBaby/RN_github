import {AsyncStorage} from 'react-native';

export default class DataStore {
  // 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchNetData(url)
        .then((wrapData) => {
          resolve(wrapData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        })
    })
  }
  // 保存数据
  saveData(key, data, callback) {
    if (!data || !key) return;
    AsyncStorage.setItem(key, JSON.stringify(this._wrapData(data)), callback);
  }
  // 取本地数据
  getData(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  }
  // 获取网络数据
  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('network response has some error');
        })
        .then((responseData) => {
          this.saveData(url, responseData);
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
  // 打个时间戳，用于判断是否过期
  _wrapData(data) {
    return {
      data: data,
      timestamp: new Date().getTime()
    }
  }
  // 过期时间检测方法
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    return currentDate.getHours() - targetDate.getHours() <= 4;
  }
}
