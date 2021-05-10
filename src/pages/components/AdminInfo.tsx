import adminStyles from '@/asset/css/admin.css';
import {
  Avatar,
  Button,
  Divider,
  Image,
  Input,
  message,
  Radio,
  Upload,
} from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import bookImg from '@/asset/imgs/book.png';
import React, { useState } from 'react';
const { TextArea } = Input;

const AdminInfo = () => {
  const [sexValue, setSexValue] = useState(1);
  const sexOnChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setSexValue(e.target.value);
  };

  //更换头像
  const [avatarChangeLoading, setAvatarChangeLoading] = useState(false);
  const bookCoverUploadConfig = {
    beforeUpload: (file: any) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJpgOrPng || !isLt2M) {
        message.error('只能上传JPG/PNG格式!且图片必须小于2MB!');
      }
      return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
    },
    onChange: (info: any) => {
      console.log(info.fileList);
      if (info.file.status === 'uploading') {
        setAvatarChangeLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        setAvatarChangeLoading(false);
      }
    },
  };
  return (
    <React.Fragment>
      <div className={adminStyles.adminUser_contentRight}>
        <div className={adminStyles.adminUser_List}>
          <div className={adminStyles.adminUser_oneRecord}>
            <Avatar
              size={100}
              alt="头像"
              src={<Image src={bookImg} />}
              style={{
                border: '1px solid',
                backgroundColor: 'whitesmoke',
                marginLeft: '10px',
                marginRight: '15px',
              }}
            />
            <Upload
              name="bookCover"
              listType="picture"
              maxCount={1}
              showUploadList={false}
              {...bookCoverUploadConfig}
            >
              <Button
                icon={
                  avatarChangeLoading ? <LoadingOutlined /> : <UploadOutlined />
                }
                style={{
                  marginRight: '15px',
                  border: '1px solid grey',
                }}
              >
                更换头像
              </Button>
              <span style={{ color: 'grey' }}>
                只能上传png和jpg格式文件, 大小不超过2M
              </span>
            </Upload>
          </div>
          <Divider style={{ borderColor: 'whitesmoke' }} />
          <div className={adminStyles.adminUser_oneRecord}>
            <span style={{ width: '100px' }}>用户名</span>
            <Input
              className={adminStyles.adminUser_input}
              style={{ width: '130px', borderRadius: '5px' }}
            />
          </div>
          <Divider style={{ borderColor: 'whitesmoke' }} />
          <div className={adminStyles.adminUser_oneRecord}>
            <span style={{ width: '100px' }}>昵称</span>
            <Input
              className={adminStyles.adminUser_input}
              style={{ width: '130px', borderRadius: '5px' }}
            />
          </div>
          <Divider style={{ borderColor: 'whitesmoke' }} />
          <div style={{ marginLeft: '50px' }}>
            <span style={{ marginRight: '70px', color: 'gray' }}>性别</span>
            <Radio.Group onChange={sexOnChange} value={sexValue}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </div>
          <Divider style={{ borderColor: 'whitesmoke' }} />

          <div className={adminStyles.adminUser_oneRecord}>
            <span style={{ width: '100px' }}>身份</span>
            <a style={{ color: 'gray', cursor: 'default' }}>管理员</a>
          </div>
          <Divider style={{ borderColor: 'whitesmoke' }} />
          <div className={adminStyles.adminUser_oneRecord}>
            <span style={{ width: '100px' }}>简介</span>
            <TextArea
              style={{ marginLeft: '15px', borderRadius: '10px' }}
              rows={4}
              placeholder="快来介绍一下自己吧！"
            />
            ,
          </div>
          <Divider style={{ borderColor: 'whitesmoke' }} />
        </div>
        <Button type="primary" style={{ marginLeft: '70px' }}>
          保存
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AdminInfo;
