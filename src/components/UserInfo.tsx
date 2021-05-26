import React, { FC, useState } from 'react';
import { Avatar, Button, Divider, Input, Radio } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import defaultAvatarImg from '@/asset/imgs/avatar.png';
import UploadFile from '@/components/UploadFile';
import { userAllType, userPartType } from '@/pages/data';

const { TextArea } = Input;

interface UserInfoProps {
  userInfo: userAllType;
  onSubmitInfo: (value: userPartType) => void;
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { userInfo, onSubmitInfo } = props;
  console.log('userInfo = ', userInfo);
  const [isUpdate, setIsUpdate] = useState(false);
  const [nicknameValue, setNicknameValue] = useState(
    userInfo ? userInfo.nickname : '',
  );
  const [genderValue, setGenderValue] = useState(
    userInfo ? (userInfo.gender === '1' ? 1 : 2) : 1,
  );
  const [signatureValue, setSignatureValue] = useState(
    userInfo ? userInfo.signature : '',
  );

  const genderOnChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setGenderValue(e.target.value);
  };
  const onNicknameInputChange = (e: any) => {
    setNicknameValue(e.target.value);
  };
  const onSignatureInputChange = (e: any) => {
    setSignatureValue(e.target.value);
  };

  //更换头像
  // const [avatarUri, setAvatarUri] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(userInfo ? userInfo.avatar : '');
  const setUri_Url = (data: any) => {
    // console.log("data = ",data)
    // setAvatarUri(data.file_uri);
    setAvatarUrl(data.file_url);
  };

  const updateUserInfo = () => {
    setIsUpdate(true);
  };

  const submitUserInfo = () => {
    const userUpdateInfo = {
      avatar: avatarUrl,
      nickname: nicknameValue,
      gender: `${genderValue}`,
      signature: signatureValue,
    };
    console.log(userUpdateInfo);
    onSubmitInfo(userUpdateInfo);
    setIsUpdate(false);
  };

  return (
    <React.Fragment>
      <div className="userInfo_list">
        <div className="userInfo_oneRecord">
          <Avatar
            size={100}
            alt="头像"
            src={avatarUrl === '' ? defaultAvatarImg : avatarUrl}
            style={{
              border: '1px solid lightgrey',
              backgroundColor: 'whitesmoke',
              marginRight: '15px',
            }}
          />
          {isUpdate ? <UploadFile setUri_Url={setUri_Url} /> : null}
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
        <div className="userInfo_oneRecord">
          <span style={{ width: '100px' }}>用户名</span>
          <Input
            className="userInfo_input"
            // onChange={onUsernameInputChange}
            value={userInfo ? userInfo.username : ''}
            disabled
          />
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
        <div className="userInfo_oneRecord">
          <span style={{ width: '100px' }}>昵称</span>
          <Input
            className="userInfo_input"
            style={{ width: '130px', borderRadius: '5px' }}
            onChange={onNicknameInputChange}
            value={nicknameValue}
            disabled={!isUpdate}
          />
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
        <div style={{ marginLeft: '50px' }}>
          <span style={{ marginRight: '70px', color: 'gray' }}>性别</span>
          <Radio.Group
            onChange={genderOnChange}
            value={genderValue}
            disabled={!isUpdate}
          >
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />

        {userInfo && userInfo.role === '2' ? (
          <div>
            <div className="userInfo_oneRecord">
              <span style={{ width: '100px' }}>身份</span>
              <a style={{ color: 'gray', cursor: 'default' }}>管理员</a>
            </div>
            <Divider style={{ borderColor: 'whitesmoke' }} />
          </div>
        ) : null}
        <div className="userInfo_oneRecord">
          <span style={{ width: '100px' }}>简介</span>
          <TextArea
            style={{ width: '400px' }}
            rows={3}
            showCount
            maxLength={100}
            placeholder="快来介绍一下自己吧！"
            onChange={onSignatureInputChange}
            value={signatureValue}
            disabled={!isUpdate}
          />
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
      </div>
      <Button
        style={{ marginLeft: '70px' }}
        onClick={updateUserInfo}
        disabled={isUpdate}
      >
        编辑
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: '10px' }}
        onClick={submitUserInfo}
        disabled={!isUpdate}
      >
        保存
      </Button>
    </React.Fragment>
  );
};

export default UserInfo;
