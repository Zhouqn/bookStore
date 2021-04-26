import React from "react";
import styles from '../index.less'
import bookImg from '../../asset/imgs/book.png'

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <img className={styles.header_bookImg} alt='book' src={bookImg}/>
        <p className={styles.header_title}>xx图书系统</p>
        <a className={styles.header_login}>登录</a>
        <a className={styles.header_register}>注册</a>
      </div>
    </React.Fragment>
  )
}

export default Header
