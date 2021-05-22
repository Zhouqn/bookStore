import React, { FC, useState } from 'react';
import userStyles from '@/asset/css/user.css';
import ChangePassword from '@/components/ChangePassword';
import { message } from 'antd';

interface User_changePasswordProps {}

const User_changePassword: FC<User_changePasswordProps> = (props) => {
  //修改密码
  const [verifyTrueFlag, setVerifyTrueFlag] = useState(false);
  const [verifyFalseFlag, setVerifyFalseFlag] = useState(false);

  const onBlurVerifyPassword = (e: any) => {
    console.log('onBlurVerifyPassword: ', e.target.value);
    const { value } = e.target;
    if (value === '123123') {
      setVerifyFalseFlag(false);
      setVerifyTrueFlag(true);
    } else if (value === '') {
      setVerifyFalseFlag(false);
    } else {
      setVerifyFalseFlag(true);
    }
  };
  const onChangeVerifyPassword = (e: any) => {
    console.log('onChangeVerifyPassword: ', e.target.value);
    const { value } = e.target;
    setVerifyFalseFlag(false);
    setVerifyTrueFlag(false);
  };
  const onFinishChangePassword = (values: any) => {
    if (verifyTrueFlag) {
      console.log('onFinishChangePassword: ', values);
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

export default User_changePassword;
