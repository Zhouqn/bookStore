import React, { FC } from 'react';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';
import { Link } from 'umi';
import { ArrowRightOutlined } from '@ant-design/icons';

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
        <div style={{ display: isLogin ? 'none' : '' }}>
          <Link className="header_enter" to="/user/register">
            稍后登录/注册，先进入{appName}
            <ArrowRightOutlined style={{ marginLeft: '5px' }} />
          </Link>
        </div>
        <div style={{ display: isLogin ? '' : 'none' }}>
          <a className="header_mine">个人中心</a>
          <a className="header_logout">退出</a>
          <a className="header_logoff">注销</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
