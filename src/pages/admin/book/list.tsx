import React, { useState, FC } from 'react';
import { connect, Dispatch } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { appName } from '@/config';
import { Avatar, Image, Layout, message } from 'antd';
import Add_Edit_BookModal from '@/pages/components/Add_Edit_BookModal';
import AdminSider from '@/pages/components/AdminSider';
import BookList from '@/pages/components/BookList';
import { bookRecordValue } from '@/pages/admin/data';
import { BookState } from '@/models/book';
import bookImg from '@/asset/imgs/book.png';
import moment from 'moment';
import { addBookRecord, editBookRecord } from '@/services/book';

const { Header, Content, Footer } = Layout;

interface ListProps {
  books: bookRecordValue[];
  dispatch: Dispatch;
}

const AdminBookList: FC<ListProps> = ({ books, dispatch }) => {
  const SiderMenuSelectedKeys = '1';

  const [add_edit_BookModalVisible, setAdd_edit_BookModalVisible] = useState(
    false,
  ); //添加书Modal是否可见
  const [bookRecord, setBookRecord] = useState<bookRecordValue | undefined>(
    undefined,
  ); //一条书信息
  const [bookSubmitLoading, setBookSubmitLoading] = useState(false);

  //点击添加按钮
  const clickAddButton = () => {
    setAdd_edit_BookModalVisible(true);
    setBookRecord(undefined);
  };
  //取消提交
  const onCancelBookModal = () => {
    setAdd_edit_BookModalVisible(false);
  };
  //提交
  const onSubmitBookModal = async (formValues: any) => {
    // setConfirmLoading(true);

    const {
      title,
      price,
      retail_price,
      pub,
      authors,
      book_cover,
      pub_dateTime,
    } = formValues;
    console.log('pub_date', moment(pub_dateTime).format('YYYY-MM-DD'));

    const cover_uri = book_cover[0].name;
    const pub_date = moment(pub_dateTime).format('YYYY-MM-DD');
    const values = {
      title,
      price,
      retail_price,
      pub,
      authors,
      cover_uri,
      pub_date,
    };

    let book_id = 0;
    if (bookRecord) {
      book_id = bookRecord.book_id;
    }

    let serviceFun;
    if (book_id) {
      serviceFun = editBookRecord;
    } else {
      serviceFun = addBookRecord;
    }
    const result = serviceFun({ book_id, values });
    if (result) {
      setAdd_edit_BookModalVisible(false);
      setBookRecord(bookRecord);
      message.success(`${book_id ? '编辑' : '添加'} 成功！`);
    } else {
      // setConfirmLoading(false);
      message.error(`${book_id ? '编辑' : '添加'} 失败！`);
    }
  };
  //删除书
  const deleteBookConfirm = (bookRecord: bookRecordValue) => {
    console.log('deleteBookConfirm = ', bookRecord);
    const { book_id } = bookRecord;
    dispatch({
      type: 'book/deleteBook',
      payload: {
        book_id,
      },
    });
  };
  // 编辑书
  const clickEditBook = (bookRecord: bookRecordValue) => {
    setAdd_edit_BookModalVisible(true);
    setBookRecord(bookRecord);
    console.log('clickEditBook', bookRecord);
  };
  return (
    <React.Fragment>
      <Layout className={adminStyles.admin}>
        <AdminSider SiderMenuSelectedKeys={SiderMenuSelectedKeys} />
        <Layout className={adminStyles.rightLayout}>
          <Header className={adminStyles.layout_header}>
            管理员页面
            <Avatar
              size={35}
              alt="头像"
              src={<Image src={bookImg} />}
              className={adminStyles.adminUser_avatar}
            />
            <a className={adminStyles.adminUser_logout}>退出登录</a>
            <a className={adminStyles.adminUser_logoff}>注销</a>
          </Header>
          <Content className={adminStyles.layout_content}>
            <BookList
              books={books}
              clickAddButton={clickAddButton}
              deleteBookConfirm={deleteBookConfirm}
              clickEditBook={clickEditBook}
            />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {appName} ©2021 Created by zqn
          </Footer>
        </Layout>
      </Layout>
      <Add_Edit_BookModal
        add_edit_BookModalVisible={add_edit_BookModalVisible}
        onSubmitBookModal={onSubmitBookModal}
        onCancelBookModal={onCancelBookModal}
        bookRecord={bookRecord}
      />
    </React.Fragment>
  );
};

export default connect(({ book }: { book: BookState }) => {
  return {
    books: book.books,
  };
})(AdminBookList);
