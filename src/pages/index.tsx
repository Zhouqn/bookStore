import styles from './index.less';
import React from "react";
import bookImg from '../asset/imgs/book.png'
import WelcomeHeader from './components/WelcomeHeader'
import Footer from './components/Footer'

export default function IndexPage() {
  return (
    <React.Fragment>
      <div className={styles.welcomePage}>
        <WelcomeHeader/>
        <div className={styles.middleContent}>
          <img className={styles.bookImg} alt="book" src={bookImg} />
          <h1 className={styles.welcomeContent}>欢迎来到XX图书系统,请先<a>登录</a>或<a>注册</a></h1>
        </div>
        <Footer/>
      </div>
     </React.Fragment>

  );
}
