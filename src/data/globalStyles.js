// 全局样式
import {Dimensions} from 'react-native';

const BACKGROUND_COLOR = '#f3f3f4';
const {height, width} = Dimensions.get('window');

export default {
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: '#e2e2e2'
  },
  root_container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  backgroundColor: BACKGROUND_COLOR,
  widow_height: height
}
