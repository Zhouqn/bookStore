import React, { useState, FC } from 'react';
import { connect, Dispatch, Loading, history } from 'umi';
import adminStyles from '@/asset/css/admin.css';
import { appName } from '@/config';
import { Avatar, Image, Layout, message, Popconfirm, Modal, Empty } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Add_Edit_BookModal from '@/components/admin/Add_Edit_BookModal';
import AdminSider from '@/components/admin/AdminSider';
import BookList from '@/components/admin/BookList';
import { bookRecordValue, FormValues } from '@/pages/data';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import bookImg from '@/asset/imgs/book.png';
import moment from 'moment';
import { singleUserType } from '@/pages/data';
import { admin_addBookRecord, admin_editBookRecord } from '@/services/book';

const { Header, Content, Footer } = Layout;

interface ListProps {
  bookListLoading: boolean;
  books: bookRecordValue[];
  page: number;
  page_size: number;
  total_count: number;
  dispatch: Dispatch;
  isLogin: boolean;
  userInfo: singleUserType | {};
}

const AdminBookList: FC<ListProps> = (props) => {
  const {
    bookListLoading,
    books,
    page,
    page_size,
    total_count,
    dispatch,
    isLogin,
    userInfo,
  } = props;
  console.log('total_count = ', total_count);
  const SiderMenuSelectedKeys = '1';

  const [add_edit_BookModalVisible, setAdd_edit_BookModalVisible] = useState(
    false,
  ); //添加书Modal是否可见
  const [bookRecord, setBookRecord] = useState<bookRecordValue | undefined>(
    undefined,
  ); //一条书信息
  const [bookSubmitLoading, setBookSubmitLoading] = useState(false);

  //页码变换
  const onPageChange = (page: number, pageSize?: number) => {
    console.log('onPageChange', page, page_size);
    if (pageSize) {
      getBookList(page, pageSize);
    } else {
      getBookList(page, page_size);
    }
  };

  //刷新(获取书列表)
  const getBookList = (page: number, page_size: number) => {
    dispatch({
      type: 'book/getBookList',
      payload: {
        page,
        page_size,
      },
    });
  };

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
  const onSubmitBookModal = async (formValues: FormValues) => {
    setBookSubmitLoading(true);
    console.log('addFormValues = ', formValues);
    const values = {
      ...formValues,
      cover_uri: formValues.cover_uri[0].response.data.file_uri,
      pub_date: moment(formValues.pub_date).format('YYYY-MM-DD'),
    };

    let book_id = 0;
    if (bookRecord) {
      book_id = bookRecord.id;
    }

    let serviceFun;
    if (book_id) {
      serviceFun = admin_editBookRecord;
    } else {
      serviceFun = admin_addBookRecord;
    }
    const result = await serviceFun({ book_id, values });
    console.log('addResult = ', result);
    if (result.code === 0) {
      setAdd_edit_BookModalVisible(false);
      setBookRecord(bookRecord);
      message.success(`${book_id ? '编辑' : '添加'}成功！`);
      getBookList(page, page_size);
      setBookSubmitLoading(false);
    } else {
      message.error(`${result.message}， ${book_id ? '编辑' : '添加'}失败！`);
      setBookSubmitLoading(false);
    }
  };
  //删除书
  const deleteBookConfirm = (bookRecord: bookRecordValue) => {
    console.log('deleteBookConfirm = ', bookRecord);
    const { id } = bookRecord;
    dispatch({
      type: 'book/deleteBook',
      payload: {
        book_id: id,
      },
    });
  };
  // 编辑书
  const clickEditBook = (bookRecord: bookRecordValue) => {
    setAdd_edit_BookModalVisible(true);
    setBookRecord(bookRecord);
    console.log('clickEditBook', bookRecord);
  };

  //确认退出
  const onConfirmLogout = () => {
    message.success('退出成功');
  };
  //取消退出
  const onCancelLogout = () => {
    message.error('取消退出');
  };
  //注销?
  const doLogoff = () => {
    Modal.confirm({
      title: '确认注销吗？',
      icon: <ExclamationCircleOutlined />,
      content: `温馨提示：如果注销，数据将会清空！请仔细思考再进行操作！`,
      okText: '确认',
      cancelText: '取消',
      onOk: onConfirmLogoff,
      onCancel: onCancelLogoff,
    });
  };
  //确认注销
  const onConfirmLogoff = () => {
    message.success('注销成功');
  };
  //取消注销
  const onCancelLogoff = () => {
    message.error('取消注销');
  };

  return isLogin ? (
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
            <Popconfirm
              title="确定退出吗?"
              onConfirm={onConfirmLogout}
              onCancel={onCancelLogout}
              okText="Yes"
              cancelText="No"
            >
              <a className={adminStyles.adminUser_logout}>退出登录</a>
            </Popconfirm>
            <a onClick={doLogoff} className={adminStyles.adminUser_logoff}>
              注销
            </a>
          </Header>
          <Content className={adminStyles.layout_content}>
            <BookList
              bookListLoading={bookListLoading}
              books={books}
              clickAddButton={clickAddButton}
              deleteBookConfirm={deleteBookConfirm}
              clickEditBook={clickEditBook}
              page={page}
              page_size={page_size}
              total_count={total_count}
              onPageChange={onPageChange}
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
        bookSubmitLoading={bookSubmitLoading}
      />
    </React.Fragment>
  ) : (
    <div>
      {message.error('未登录,请先登录')}
      {history.push('/')}
    </div>
  );
};

export default connect(
  ({
    user,
    book,
    loading,
  }: {
    user: UserModelState;
    book: BookModelState;
    loading: Loading;
  }) => {
    return {
      bookListLoading: loading.models.book,
      books: book.books,
      page: book.page,
      page_size: book.page_size,
      total_count: book.total_count,
      isLogin: user.isLogin,
      userInfo: user.userInfo,
    };
  },
)(AdminBookList);
