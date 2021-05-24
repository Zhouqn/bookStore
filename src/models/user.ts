import { Reducer, Effect, Subscription, history } from 'umi';
import { goLogin, goRegister, getUserInfo } from '@/services/user';
import { singleUserType } from '@/pages/data';
import { message } from 'antd';

export interface UserModelState {
  userInfo: singleUserType | {};
  isLogin: boolean;
  isAdmin: boolean;
}

interface UserModelType {
  namespace: string;
  state: UserModelState;
  reducers: {
    setUserInfo: Reducer; //getList的类型是Reducer，返回值是UserState类型
  };
  effects: {
    goLogin: Effect;
    goRegister: Effect;
    // goLogin_byModal:Effect;
    getUserInfo: Effect;
  };
  subscriptions: {
    // setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    userInfo: {},
    isLogin: false,
    isAdmin: false,
  },
  reducers: {
    setUserInfo(state, { payload }) {
      console.log('models_setUserInfo_payload', payload);
      return payload;
    },
  },
  effects: {
    //登录
    *goLogin({ payload }, { put, call }) {
      console.log('models_goLogin_payload = ', payload);
      const res = yield call(goLogin, payload);
      console.log('models_goLogin_res = ', res);
      if (res.code === 0) {
        const userInfo_res = yield call(getUserInfo);
        console.log('userInfo_res = ', userInfo_res);
        message.success('登录成功');
        if (userInfo_res.code === 0) {
          yield put({
            type: 'setUserInfo',
            payload: {
              isLogin: true,
              userInfo: userInfo_res.data,
              isAdmin: userInfo_res.data.role === '2',
            },
          });
          if (payload.flag === 2) {
            history.goBack();
          } else if (userInfo_res.data.role === '1') {
            history.push('/user/book/list');
          } else if (userInfo_res.data.role === '2') {
            history.push('/admin/book/list');
          }
        } else {
          message.error(userInfo_res.message);
        }
      } else {
        message.error(res.message);
      }
    },
    //注册
    *goRegister({ payload }, { put, call }) {
      console.log('goRegister_effect_payload = ', payload);
      const res = yield call(goRegister, payload);
      console.log('goRegister_effect_res = ', res);
      if (res.code === 0) {
        history.push('/user/login');
        message.success('注册成功，请登录！');
      } else {
        message.error(res.msg);
      }
    },
    //获取用户信息
    *getUserInfo(action, { put, call }) {
      const res = yield call(getUserInfo);
      if (res.code === 0) {
        // yield put({type:"setUserInfo", payload:{
        //     isLogin: true,
        //     userInfo: res.data,
        //     isAdmin: res.data.role === '2',
        //   }})
      }
    },
  },
  subscriptions: {},
};

export default UserModel;
