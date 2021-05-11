import styles from '@/pages/index.css';
import React from 'react';
import { Link, connect } from 'umi';
import { UserModelState } from '@/models/user';
import bookImg from '../asset/imgs/book.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IndexPage = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <React.Fragment>
      <div className={styles.welcomePage}>
        <Header isLogin={isLogin} />
        <div className={styles.middleContent}>
          <img className={styles.bookImg} alt="book" src={bookImg} />
          <h1 className={styles.welcomeContent}>
            欢迎来到XX图书系统,请先<Link to="/user/login">登录</Link>或
            <Link to="/user/register">注册</Link>
          </h1>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default connect(({ user }: { user: UserModelState }) => {
  console.log('user = ', user);
  return {
    isLogin: user.isLogin,
  };
})(IndexPage);
