import React, { FC, useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import { UserModelState } from '@/models/user';
import { userAllType } from '@/pages/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { message } from 'antd';
import { Loading } from '@@/plugin-dva/connect';

interface UserBookListProps {
  dispatch: Dispatch;
  isLogin: boolean;
  userInfo: userAllType;
  bookModelLoading: boolean;
}

const UserBookList: FC<UserBookListProps> = (props) => {
  const { dispatch, isLogin, userInfo } = props;

  useEffect(() => {
    dispatch({ type: 'user/getUserInfo', payload: {} });
    history.push('/user/book/list');
  }, []);

  //确认退出
  const onConfirmLogoff = () => {
    dispatch({
      type: 'user/goLogoff',
      payload: {},
    });
  };
  //取消退出
  const onCancelLogoff = () => {
    message.error('取消退出');
  };

  return (
    <React.Fragment>
      <Header
        isLogin={isLogin}
        userInfo={userInfo}
        onConfirmLogoff={onConfirmLogoff}
        onCancelLogoff={onCancelLogoff}
      />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => {
    return {
      //user
      isLogin: user.isLogin,
      userInfo: user.userInfo,
    };
  },
)(UserBookList);
