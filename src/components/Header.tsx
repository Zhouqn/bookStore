import React, { FC, useState } from 'react';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';
import { Link } from 'umi';

interface HeaderProps {
  isLogin: boolean;
}

const Header: FC<HeaderProps> = (props) => {
  const { isLogin } = props;

  return (
    <React.Fragment>
      <div className="header">
        <Link to="/">
          <img className="header_bookImg" alt="book" src={bookImg} />
        </Link>
        <Link className="header_title" to="/">
          {appName}
        </Link>
        {isLogin ? (
          <div>
            <a className="header_mine">个人中心</a>
            <a className="header_logout">退出</a>
            <a className="header_logoff">注销</a>
          </div>
        ) : (
          <div>
            <Link className="header_login" to="/user/login">
              登录
            </Link>
            <Link className="header_register" to="/user/register">
              注册
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Header;
