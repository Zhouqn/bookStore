import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
import UserInfo from '@/components/UserInfo';
import { UserModelState } from '@/models/user';
import { userAllType, userPartType } from '@/pages/data';

interface Admin_BasicInfoProps {
  dispatch: Dispatch;
  userInfo: userAllType;
}

const Admin_BasicInfo: FC<Admin_BasicInfoProps> = (props) => {
  const { dispatch, userInfo } = props;

  const onSubmitInfo = (info: userPartType) => {
    dispatch({
      type: 'user/goUpdate',
      payload: {
        info,
        userRole: '2',
      },
    });
  };

  return <UserInfo userInfo={userInfo} onSubmitInfo={onSubmitInfo} />;
};

export default connect(({ user }: { user: UserModelState }) => {
  return {
    userInfo: user.userInfo,
  };
})(Admin_BasicInfo);
