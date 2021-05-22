import React, { useState } from 'react';
import { Avatar, Button, Divider, Input, Radio } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import defaultAvatarImg from '@/asset/imgs/avatar.png';
import UploadFile from '@/components/UploadFile';

const { TextArea } = Input;

//从父页面获取到userInfo
const user = {
  id: 1,
  avatar: '',
  username: 'Mick',
  nickname: 'M..',
  gender: 'male',
  signature: '',
  role: 2,
};

const UserInfo = () => {
  const [usernameValue, setUsernameValue] = useState(user.username);
  const [nicknameValue, setNicknameValue] = useState(user.nickname);
  const [genderValue, setGenderValue] = useState(
    user.gender === 'male' ? 1 : 2,
  );
  const [signatureValue, setSignatureValue] = useState(user.signature);

  const genderOnChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setGenderValue(e.target.value);
  };
  const onUsernameInputChange = (e: any) => {
    setUsernameValue(e.target.value);
  };
  const onNicknameInputChange = (e: any) => {
    setNicknameValue(e.target.value);
  };
  const onSignatureInputChange = (e: any) => {
    setSignatureValue(e.target.value);
  };

  //更换头像
  const [avatarUri, setAvatarUri] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const setUri_Url = (data: any) => {
    // console.log("data = ",data)
    setAvatarUri(data.file_uri);
    setAvatarUrl(data.file_url);
  };

  const submitUserInfo = () => {
    const userUpdateInfo = {
      avatar: avatarUri,
      username: usernameValue,
      nickname: nicknameValue,
      gender: genderValue === 1 ? 'male' : 'female',
      signature: signatureValue,
    };
    console.log(userUpdateInfo);
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
              border: '1px solid',
              backgroundColor: 'whitesmoke',
              marginRight: '15px',
            }}
          />
          <UploadFile setUri_Url={setUri_Url} />
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
        <div className="userInfo_oneRecord">
          <span style={{ width: '100px' }}>用户名</span>
          <Input
            className="userInfo_input"
            onChange={onUsernameInputChange}
            value={usernameValue}
          />
          {usernameValue === '' ? (
            <span style={{ color: 'red', marginLeft: '10px' }}>
              <CloseCircleOutlined
                style={{ color: 'red', marginRight: '5px' }}
              />
              用户名不能为空
            </span>
          ) : null}
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
        <div className="userInfo_oneRecord">
          <span style={{ width: '100px' }}>昵称</span>
          <Input
            className="userInfo_input"
            style={{ width: '130px', borderRadius: '5px' }}
            onChange={onNicknameInputChange}
            value={nicknameValue}
          />
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
        <div style={{ marginLeft: '50px' }}>
          <span style={{ marginRight: '70px', color: 'gray' }}>性别</span>
          <Radio.Group onChange={genderOnChange} value={genderValue}>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />

        {user.role === 2 ? (
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
          />
        </div>
        <Divider style={{ borderColor: 'whitesmoke' }} />
      </div>
      <Button
        type="primary"
        style={{ marginLeft: '70px' }}
        onClick={submitUserInfo}
      >
        保存
      </Button>
    </React.Fragment>
  );
};

export default UserInfo;
