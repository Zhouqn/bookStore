import { Reducer, Effect, Subscription, history } from 'umi';
import {
  goLogin,
  goRegister,
  getUserInfo,
  goUpdate,
  goLogoff,
} from '@/services/user';
import { userAllType, myCommentsType } from '@/pages/data';
import { message } from 'antd';

export interface UserModelState {
  userInfo: userAllType;
  isLogin: boolean;
  isAdmin: boolean;
  admin_sider_menu: string;
  admin_info_menu: string;
  user_info_menu: string;
  myComments: myCommentsType[];
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
    getUserInfo: Effect;
    goUpdate: Effect;
    goLogoff: Effect;
  };
  subscriptions: {
    admin_Info: Subscription;
    user_Info: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    userInfo: {
      user_id: 0,
      avatar: '',
      username: '',
      password: '',
      gender: '',
      role: '',
      nickname: '',
      signature: '',
      register_time: '',
    },
    isLogin: false,
    isAdmin: false,
    admin_sider_menu: '1',
    admin_info_menu: '1',
    user_info_menu: '1',
    myComments: [],
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return payload;
    },
  },
  effects: {
    //登录
    *goLogin({ payload }, { put, call }) {
      const res = yield call(goLogin, payload);
      if (res.code === 0) {
        const userInfo_res = yield call(getUserInfo);
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
          if (payload.flag) {
            //login Modal
            // history.goBack();
            history.push(`/user/book/${payload.flag}`);
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
      const res = yield call(goRegister, payload);
      if (res.code === 0) {
        history.push('/user/login');
        message.success('注册成功，请登录！');
      } else {
        message.error(res.msg);
      }
    },
    //获取用户信息
    *getUserInfo({ payload }, { put, call }) {
      const res = yield call(getUserInfo);
      if (res.code === 0) {
        yield put({
          type: 'setUserInfo',
          payload: {
            isLogin: true,
            userInfo: res.data,
            isAdmin: res.data.role === '2',
            admin_sider_menu: payload.admin_sider_menu
              ? payload.admin_sider_menu
              : '1',
            admin_info_menu: payload.admin_info_menu
              ? payload.admin_info_menu
              : '1',
            user_info_menu: payload.user_info_menu
              ? payload.user_info_menu
              : '1',
          },
        });
      }
    },
    //更新用户信息
    *goUpdate({ payload }, { put, call }) {
      const res = yield call(goUpdate, payload.info);
      if (res.code === 0) {
        if (payload.userRole === '1') {
          history.push('/user/info/basicInfo');
        } else {
          history.push('/admin/info/basicInfo');
        }
        message.success('修改成功！');
      } else {
        message.error(res.msg);
      }
    },
    //退出登录
    *goLogoff({ payload }, { put, call }) {
      const res = yield call(goLogoff);
      if (res.code === 0) {
        yield put({
          type: 'setUserInfo',
          payload: {
            isLogin: false,
          },
        });
        message.success('已退出！');
        history.push('/');
      }
    },
  },
  subscriptions: {
    admin_Info({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/book/list') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              admin_sider_menu: '1',
              admin_info_menu: '1',
            },
          });
        } else if (pathname === '/admin/info/basicInfo') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              admin_sider_menu: '2',
              admin_info_menu: '1',
            },
          });
        } else if (pathname === '/admin/info/changePassword') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              admin_sider_menu: '2',
              admin_info_menu: '2',
            },
          });
        }
      });
    },
    user_Info({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/info/basicInfo') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              user_info_menu: '1',
            },
          });
        } else if (pathname === '/user/info/changePassword') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              user_info_menu: '2',
            },
          });
        } else if (pathname === '/user/info/myComments') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              user_info_menu: '3',
            },
          });
        } else if (pathname === '/user/info/likeComments') {
          dispatch({
            type: 'getUserInfo',
            payload: {
              user_info_menu: '4',
            },
          });
        } else if (
          pathname === '/user/login' ||
          pathname === '/user/register'
        ) {
          dispatch({
            type: 'getUserInfo',
            payload: {},
          });
        }
      });
    },
  },
};

export default UserModel;
