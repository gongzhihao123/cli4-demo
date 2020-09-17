// import { getToken, setToken } from '@/utils/auth'
import api from "./../../api/user";

const user = {
  state: {},

  mutations: {},

  actions: {
    // 登录
    // eslint-disable-next-line no-unused-vars
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api
          .login(userInfo)
          .then(res => {
            if (res.code === 200) {
              console.log(res);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};

export default user;
