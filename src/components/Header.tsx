import React, { FC, useState } from 'react';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';
import { Link } from 'umi';
import LoginModal from '@/components/user/loginModal';
import { FormValues } from '@/pages/data';
import { message } from 'antd';

interface HeaderProps {
  isLogin: boolean;
}

const Header: FC<HeaderProps> = (props) => {
  const { isLogin } = props;
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginModalLoading, setLoginModalLoading] = useState(false);

  const clickLogin = () => {
    setLoginModalVisible(true);
  };
  //提交登录
  const submitLoginModal = (formValues: FormValues) => {
    console.log('submitLoginModal_formValues = ', formValues);
    setLoginModalVisible(false);
    // setLoginModalLoading(true) //连接到后台启用
    // message.success("登陆成功")
  };
  //Modal 取消登录
  const LoginModalHandleCancel = () => {
    setLoginModalVisible(false);
    message.error('已取消');
  };
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
            {/*<Link className="header_login" to='/user/login'>登录</Link>*/}
            <a onClick={clickLogin} className="header_login">
              登录
            </a>
            <Link className="header_register" to="/user/register">
              注册
            </Link>
          </div>
        )}
      </div>
      <LoginModal
        loginModalVisible={loginModalVisible}
        submitLoginModal={submitLoginModal}
        LoginModalHandleCancel={LoginModalHandleCancel}
        loginModalLoading={loginModalLoading}
      />
    </React.Fragment>
  );
};

export default Header;
