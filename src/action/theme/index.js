import Types from '../types';


// 主题变更
export function onThemeChange(theme = '#2196F3') {
  return {type: Types.THEME_CHANGE, theme: theme}
}

// 初始化主题
export function onThemeInit() {
    return {type: Types.THEME_CHANGE, theme: '#2196F3'};
}

// 初始化主题
export function onShowCustomThemeView(status) {
  return {type: Types.ON_SHOW_CUSTOM_THEME_View, status};
}
