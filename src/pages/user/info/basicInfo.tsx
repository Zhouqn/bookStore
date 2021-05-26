import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
import userStyles from '@/asset/css/user.css';
import UserInfo from '@/components/UserInfo';
import { UserModelState } from '@/models/user';
import { userAllType, userPartType } from '@/pages/data';

interface Admin_BasicInfoProps {
  dispatch: Dispatch;
  userInfo: userAllType;
}

const User_BasicInfo: FC<Admin_BasicInfoProps> = (props) => {
  const { dispatch, userInfo } = props;

  const onSubmitInfo = (info: userPartType) => {
    console.log('onSubmitInfo = ', info);
    dispatch({
      type: 'user/goUpdate',
      payload: {
        info,
        userRole: '1',
      },
    });
  };
  return (
    <div className={userStyles.commonUser_user_basicInfo}>
      <UserInfo userInfo={userInfo} onSubmitInfo={onSubmitInfo} />
    </div>
  );
};

export default connect(({ user }: { user: UserModelState }) => {
  return {
    userInfo: user.userInfo,
  };
})(User_BasicInfo);
