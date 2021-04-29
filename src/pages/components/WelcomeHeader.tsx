import React from "react";
import styles from '../index.less'
import bookImg from '../../asset/imgs/book.png'

// const contentHeaderFlag = window.

const WelcomeHeader = () => {
  return (
    <React.Fragment>
      <div className={styles.WelcomeHeader} style={{display:"none"}}>
        <img className={styles.header_bookImg} alt='book' src={bookImg}/>
        <p className={styles.header_title}>xx图书系统</p>
        <a className={styles.header_login}>登录</a>
        <a className={styles.header_register}>注册</a>
      </div>
      <div className={styles.WelcomeHeader} /*style={{display:"none"}}*/>
        <img className={styles.header_bookImg} alt='book' src={bookImg}/>
        <p className={styles.header_title}>xx图书系统</p>
        <a className={styles.header_mine}>个人中心</a>
        <a className={styles.header_logout}>退出</a>
        <a className={styles.header_logoff}>注销</a>
      </div>
    </React.Fragment>

  )
}

export default WelcomeHeader
