import React from 'react';
import styles from '@/global.css';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';

const ContentHeader = () => {
  return (
    <React.Fragment>
      <div className={styles.WelcomeHeader}>
        <img className={styles.header_bookImg} alt="book" src={bookImg} />
        <p className={styles.header_title}>{appName}</p>
        <a className={styles.header_login}>登录</a>
        <a className={styles.header_register}>注册</a>
      </div>
    </React.Fragment>
  );
};

export default ContentHeader;
