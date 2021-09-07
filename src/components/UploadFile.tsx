import { Button, message, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';

interface UploadFileProps {
  setUri_Url: (data: any) => void;
}

const UploadFile: FC<UploadFileProps> = (props) => {
  const { setUri_Url } = props;
  const [fileLoading, setFileLoading] = useState(false);

  const fileUploadConfig = {
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
      if (info.file.status === 'uploading') {
        setFileLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 0) {
          setUri_Url(info.file.response.data);
          message.success('上传成功');
          info.fileList = [];
        } else {
          message.error(info.file.response.message);
        }
        setFileLoading(false);
      }
    },
  };

  return (
    <React.Fragment>
      <Upload
        name="file"
        listType="picture"
        action="/api/upload"
        maxCount={1}
        showUploadList={false}
        {...fileUploadConfig}
      >
        <Button icon={fileLoading ? <LoadingOutlined /> : <UploadOutlined />}>
          上传
        </Button>
        <span style={{ color: 'grey' }}>
          只能上传png和jpg格式文件, 大小不超过2M
        </span>
      </Upload>
    </React.Fragment>
  );
};

export default UploadFile;
