// 导航通用方法
export default class NavigationUtil{

  // 跳转至指定页
  static goToPage(params, page) {
    // const {navigation} = params;
    const navigation = NavigationUtil.navigation;
    navigation.navigate(
      page,
      {
        ...params
      }
    );
  }

  // 返回
  static goBack(navigation) {
    // const {navigation} = params;
    navigation.goBack();
  }

  // 返回至首页
  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate("Main");
  }
}
