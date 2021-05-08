import React, { useState } from 'react';
import { connect } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { appName } from '@/config';
import { Layout } from 'antd';
import AddBookModal from '@/pages/components/AddBookModal';
import AdminSider from '@/pages/components/AdminSider';
import BookList from '@/pages/components/BookList';
import { BookRecordValue } from '@/pages/admin/data';

const { Header, Content, Footer } = Layout;

const books = [
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: 'python',
    author: 'jack',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: 'Java',
    author: 'nick',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    cover_uri: '/image/book1',
    number: '2020222',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
];

const List = () => {
  const [addBookModalVisible, setAddBookModalVisible] = useState(false);

  const clickAddButton = () => {
    setAddBookModalVisible(true);
  };
  const onCancelAddBook = () => {
    setAddBookModalVisible(false);
  };
  const onAddBook = (values: any) => {
    console.log('Received values of form: ', values);
    setAddBookModalVisible(false);
  };

  //删除书
  const deleteBookConfirm = (book: BookRecordValue) => {
    console.log('deleteBookConfirm = ', book);
  };
  // 编辑书
  const editBookRecord = (book: BookRecordValue) => {
    setAddBookModalVisible(true);
    console.log('editBookRecord', book);
  };
  return (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>管理员页面</Header>
          <Content className={adminStyles.layout_content}>
            <BookList
              books={books}
              clickAddButton={clickAddButton}
              deleteBookConfirm={deleteBookConfirm}
              editBookRecord={editBookRecord}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {appName} ©2021 Created by zqn
          </Footer>
        </Layout>
      </Layout>
      <AddBookModal
        addBookModalVisible={addBookModalVisible}
        onAddBook={onAddBook}
        onCancelAddBook={onCancelAddBook}
      />
    </React.Fragment>
  );
};

export default connect((state) => {
  console.log(state);
  return {};
})(List);
