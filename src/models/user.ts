import { Reducer, Effect, Subscription } from 'umi';
import { goLogin } from '@/services/user';

interface UserModelType {
  namespace: string;
  state: {
    userInfo: {};
  };
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
