import { Reducer, Effect, Subscription, history } from 'umi';
import { goLogin } from '@/services/user';
import { singleUserType } from '@/pages/data';

export interface UserModelState {
  userInfo: singleUserType | {};
  isLogin: boolean;
}

interface UserModelType {
  namespace: string;
  state: UserModelState;
  reducers: {
    setUserInfo: Reducer; //getList的类型是Reducer，返回值是UserState类型
  };
  effects: {
    goLogin: Effect;
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
  },
  reducers: {
    setUserInfo(state, { payload }) {
      console.log('models_setUserInfo_payload', payload);
      return payload;
    },
  },
  effects: {
    *goLogin({ payload }, { put, call }) {
      console.log('models_goLogin_payload = ', payload);
      const res = yield call(goLogin, payload);
      console.log('models_goLogin_res = ', res);
      if (res.code === 0) {
        yield put({
          type: 'setUserInfo',
          payload: {
            isLogin: true,
            userInfo: res.data,
          },
        });
        if (res.data.role === 1) {
          history.push('/user/book/list');
        } else if (res.data.role === 2) {
          history.push('/admin/book/list');
        }
      }
    },
  },
  subscriptions: {},
};

export default UserModel;
