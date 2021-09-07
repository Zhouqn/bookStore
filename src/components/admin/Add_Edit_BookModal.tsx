import React, { FC, useState, useEffect } from 'react';
import { Button, Modal, Form, Input, DatePicker, Upload, message } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { bookRecordValue, FormValues } from '@/pages/data';
import moment from 'moment';
const { TextArea } = Input;

interface Add_Edit_BookModalProps {
  add_edit_BookModalVisible: boolean;
  onSubmitBookModal: (formValues: FormValues) => void;
  onCancelBookModal: () => void;
  bookRecord: bookRecordValue | undefined;
  bookSubmitLoading: boolean;
}

const Add_Edit_BookModal: FC<Add_Edit_BookModalProps> = (props) => {
  //Model
  const {
    add_edit_BookModalVisible,
    onSubmitBookModal,
    onCancelBookModal,
    bookRecord,
    bookSubmitLoading,
  } = props;
  const [form] = Form.useForm();
  const layoutFrom = {
    labelCol: { span: 5 },
    wrapperCol: { span: 21 },
  };

  useEffect(() => {
    if (bookRecord === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        cover_uri: null,
        title: bookRecord.title,
        authors: bookRecord.authors,
        pub: bookRecord.pub,
        pub_date: moment(bookRecord.pub_date),
        price: bookRecord.price,
        retail_price: bookRecord.retail_price,
        describe: bookRecord.describe,
        rate: bookRecord.rate,
      });
    }
  }, [add_edit_BookModalVisible]);

  //From Item
  //上传封面
  const [bookCoverLoading, setBookCoverLoading] = useState(false);
  const bookCoverFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
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
      if (info.file.status === 'uploading') {
        setBookCoverLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 0) {
          message.success('上传成功');
        } else {
          message.error(info.file.response.message);
        }
        setBookCoverLoading(false);
      }
    },
  };

  //选择日期
  const dateTimeConfig = {
    rules: [{ type: 'object' as const, required: true, message: '选择时间!' }],
  };

  //提交
  const onOk = () => {
    form.submit();
  };
  const submitBookModalOnFinish = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmitBookModal(values);
        // form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        message.error('请检查你的表单是否填写正确');
      });
  };

  const submitBookModalFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      visible={add_edit_BookModalVisible}
      title={
        bookRecord ? `当前编辑的编号为 ${bookRecord.id} 的书籍` : '添加新书'
      }
      okText="提交"
      cancelText="取消"
      onCancel={onCancelBookModal}
      onOk={onOk}
      confirmLoading={bookSubmitLoading}
      forceRender
    >
      <Form
        form={form}
        name="form_in_modal"
        {...layoutFrom}
        onFinish={submitBookModalOnFinish}
        onFinishFailed={submitBookModalFailed}
      >
        <Form.Item
          name="cover_uri"
          label="上传书封面"
          rules={
            bookRecord ? [] : [{ required: true, message: '请上传书封面!' }]
          }
          valuePropName="fileList"
          getValueFromEvent={bookCoverFile}
        >
          <Upload
            name="file"
            listType="picture"
            action="/api/upload"
            maxCount={1}
            {...bookCoverUploadConfig}
          >
            <Button
              icon={bookCoverLoading ? <LoadingOutlined /> : <UploadOutlined />}
            >
              上传
            </Button>
            <span style={{ color: 'grey' }}>
              只能上传png和jpg格式文件, 大小不超过2M
            </span>
          </Upload>
        </Form.Item>
        <Form.Item
          name="title"
          label="书名"
          rules={
            bookRecord ? [] : [{ required: true, message: '书名不能为空!' }]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="authors"
          label="作者"
          rules={
            bookRecord ? [] : [{ required: true, message: '作者不能为空!' }]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pub"
          label="出版社"
          rules={
            bookRecord ? [] : [{ required: true, message: '出版社不能为空!' }]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pub_date" //最后要转换成string形式 -> pub_date
          label="出版日期"
          {...dateTimeConfig}
          rules={
            bookRecord ? [] : [{ required: true, message: '请选择出版日期!' }]
          }
        >
          <DatePicker placeholder="选择出版日期" />
        </Form.Item>
        <Form.Item
          name="price"
          label="原价"
          rules={[{ required: !bookRecord, message: '原价不能为空!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="retail_price"
          label="零售价"
          rules={
            bookRecord ? [] : [{ required: true, message: '零售价不能为空!' }]
          }
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="describe"
          label="描述"
          rules={
            bookRecord
              ? []
              : [{ required: true, message: '请对此书进行简单描述!' }]
          }
        >
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add_Edit_BookModal;
