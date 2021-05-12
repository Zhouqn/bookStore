import { Reducer, Effect, Subscription } from 'umi';
import { singleUserType } from '@/pages/user/data';

export interface UserModelState {
  userInfo: singleUserType | {};
  isLogin: boolean;
}

interface UserModelType {
  namespace: string;
  state: UserModelState;
  reducers: {
    // : Reducer  //getList的类型是Reducer，返回值是UserState类型
  };
  effects: {
    // goLogin: Effect;
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
  effects: {},
  subscriptions: {},
};

export default UserModel;
