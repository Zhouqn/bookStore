import styles from './index.less';
import React from "react";
import { Link } from 'umi';
import bookImg from '../asset/imgs/book.png'
import Header from './components/Header'
import Footer from './components/Footer'


export default function IndexPage() {


  return (
    <React.Fragment>
      <div className={styles.welcomePage}>
        <Header/>
        <div className={styles.middleContent}>
          <img className={styles.bookImg} alt="book" src={bookImg} />
          {/*<h1 className={styles.welcomeContent}>欢迎来到XX图书系统,请先<a>登录</a>或<a>注册</a></h1>*/}
          <h1 className={styles.welcomeContent}>欢迎来到XX图书系统,请先<Link to="/user/login">登录</Link>或<Link to="/user/register">注册</Link></h1>

        </div>
        <Footer/>
      </div>
     </React.Fragment>

  );
}
