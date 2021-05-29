// import styles from '@/pages/index.css';
import React, { FC, useEffect } from 'react';
import { Link, connect, Dispatch, history } from 'umi';
// import { UserModelState } from '@/models/user';
// import { appName } from '@/config';
// import bookImg from '../asset/imgs/book.png';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { userAllType } from '@/pages/data';
// import { message } from 'antd';

// interface IndexPageProps {
//   dispatch: Dispatch;
//   isLogin: boolean;
//   userInfo: userAllType;
// }
const IndexPage: FC = () => {
  // const IndexPage: FC<IndexPageProps> = (props) => {
  // const { dispatch, isLogin, userInfo } = props;
  // useEffect(() => {}, []);
  //
  // //确认退出
  // const onConfirmLogoff = () => {
  //   dispatch({
  //     type: 'user/goLogoff',
  //     payload: {},
  //   });
  // };
  // //取消退出
  // const onCancelLogoff = () => {
  //   message.error('取消退出');
  // };
  //
  useEffect(() => {
    history.push('/user/book/list');
  }, []);

  return (
    <React.Fragment>
      {/*<div className={styles.welcomePage}>*/}
      {/*  <Header*/}
      {/*    isLogin={isLogin}*/}
      {/*    userInfo={userInfo}*/}
      {/*    onConfirmLogoff={onConfirmLogoff}*/}
      {/*    onCancelLogoff={onCancelLogoff}*/}
      {/*  />*/}
      {/*  <div className={styles.middleContent}>*/}
      {/*    <img className={styles.bookImg} alt="book" src={bookImg} />*/}
      {/*    <h1 className={styles.welcomeContent}>*/}
      {/*      欢迎来到XX图书系统,请先<Link to="/user/login">登录</Link>或*/}
      {/*      <Link to="/user/register">注册</Link>*/}
      {/*    </h1>*/}
      {/*    <Link to="/user/book/list">稍后登录/注册，先进入{appName}</Link>*/}
      {/*  </div>*/}
      {/*  <Footer />*/}
      {/*</div>*/}
    </React.Fragment>
  );
};
// export default connect(({ user }: { user: UserModelState }) => {
//   console.log('user = ', user);
//   return {
//     isLogin: user.isLogin,
//     userInfo: user.userInfo,
//   };
// })(IndexPage);
export default IndexPage;
