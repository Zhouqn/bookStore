import React from 'react';
import userStyles from '@/asset/css/user.css';
import UserInfo from '@/components/UserInfo';

const User_BasicInfo = () => {
  return (
    <div className={userStyles.commonUser_user_basicInfo}>
      <UserInfo />
    </div>
  );
};

export default User_BasicInfo;
