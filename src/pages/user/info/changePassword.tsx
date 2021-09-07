import React, { FC, useState } from 'react';
import { Dispatch, history, connect } from 'umi';
import userStyles from '@/asset/css/user.css';
import ChangePassword from '@/components/ChangePassword';
import { message } from 'antd';
import { verifyPassword, modifyPassword, goLogoff } from '@/services/user';
// @ts-ignore
import md5 from 'md5';

interface User_changePasswordProps {
  dispatch: Dispatch;
}

const User_changePassword: FC<User_changePasswordProps> = (props) => {
  const { dispatch } = props;
  //修改密码
  const [verifyTrueFlag, setVerifyTrueFlag] = useState(false);
  const [verifyFalseFlag, setVerifyFalseFlag] = useState(false);
  const [oldPassword, setOldPassword] = useState('');

  const onBlurVerifyPassword = (e: any) => {
    const { value } = e.target;
    if (value === '') {
      setVerifyTrueFlag(false);
      setVerifyFalseFlag(false);
    } else {
      setOldPassword(md5(value));
      const payload = {
        password: md5(value),
      };
      verifyPassword(payload).then((value) => {
        if (value.code === 0) {
          setVerifyTrueFlag(true);
          setVerifyFalseFlag(false);
        } else {
          setVerifyTrueFlag(false);
          setVerifyFalseFlag(true);
        }
      });
    }
  };
  const onChangeVerifyPassword = (e: any) => {
    const { value } = e.target;
    setVerifyFalseFlag(false);
    setVerifyTrueFlag(false);
  };
  const onFinishChangePassword = (values: any) => {
    if (verifyTrueFlag) {
      const payload = {
        old_password: oldPassword,
        new_password: md5(values.password),
      };
      modifyPassword(payload).then((value) => {
        if (value.code === 0) {
          dispatch({
            type: 'user/goLogoff',
            payload: {},
          }).then(() => {
            message.success('请重新登录！');
          });
        } else {
          message.error('修改失败');
        }
      });
    } else {
      message.error('请先验证旧密码');
    }
  };

  return (
    <div className={userStyles.commonUser_user_changePassword}>
      <ChangePassword
        onFinishChangePassword={onFinishChangePassword}
        onBlurVerifyPassword={onBlurVerifyPassword}
        onChangeVerifyPassword={onChangeVerifyPassword}
        verifyFalseFlag={verifyFalseFlag}
        verifyTrueFlag={verifyTrueFlag}
      />
    </div>
  );
};

export default connect()(User_changePassword);
