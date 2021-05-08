import React from 'react';
import styles from '@/global.css';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';

// const contentHeaderFlag = window.

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.Header}>
        <img className={styles.header_bookImg} alt="book" src={bookImg} />
        <p className={styles.header_title}>{appName}</p>
        <div style={{ display: 'none' }}>
          <a className={styles.header_login}>登录</a>
          <a className={styles.header_register}>注册</a>
        </div>
        <div style={{ display: 'none' }}>
          <a className={styles.header_mine}>个人中心</a>
          <a className={styles.header_logout}>退出</a>
          <a className={styles.header_logoff}>注销</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;