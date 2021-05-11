import { Reducer, Effect, Subscription } from 'umi';
import { goLogin } from '@/services/user';

export interface UserModelState {
  userInfo: {};
  isLogin: boolean;
}

interface UserModelType {
  namespace: string;
  state: UserModelState;
  reducers: {
    // getList: Reducer  //getList的类型是Reducer，返回值是UserState类型
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
  reducers: {},
  effects: {
    *goLogin({ payload }, { call }) {
      const res = yield call(goLogin, payload);
      console.log(res);
    },
  },
  subscriptions: {},
};

export default UserModel;
