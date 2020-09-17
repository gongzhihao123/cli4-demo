import request from "./../uitls/request";

export default {
  apiLogin(data) {
    return request({
      url: "/auth/authorize",
      method: "post",
      data
    });
  },
  // 验证
  apiCodeImgUrl() {
    return request({
      url: "/auth/code",
      method: "get"
    });
  },
  getUserInfo() {
    return request({
      url: "/userInfo",
      method: "get"
    });
  }
};
