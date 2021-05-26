import React, { FC, useEffect, useState } from 'react';
import bookImg from '@/asset/imgs/book.png';
import { appName } from '@/config';
import { Dispatch, Link, connect } from 'umi';
import { Avatar, Image, message, Popconfirm } from 'antd';
import { UserModelState } from '@/models/user';
import defaultAvatarImg from '@/asset/imgs/avatar.png';
import { userAllType } from '@/pages/data';

interface HeaderProps {
  isLogin: boolean;
  userInfo: userAllType;
  onConfirmLogoff: () => void;
  onCancelLogoff: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  const { isLogin, userInfo, onCancelLogoff, onConfirmLogoff } = props;

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
            <Avatar
              size={35}
              alt="头像"
              src={
                <Image
                  src={
                    userInfo && userInfo.avatar
                      ? userInfo.avatar
                      : defaultAvatarImg
                  }
                />
              }
              className="header_avatar"
            />
            {/*<a className="header_mine">个人中心</a>*/}
            <Link to="/user/info/basicInfo" className="header_mine">
              个人中心
            </Link>
            <Popconfirm
              title="确定退出吗?"
              onConfirm={onConfirmLogoff}
              onCancel={onCancelLogoff}
              okText="Yes"
              cancelText="No"
            >
              <a className="header_logoff">退出登录</a>
            </Popconfirm>
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
