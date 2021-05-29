import React, { useState, FC, useEffect } from 'react';
import { connect, Dispatch, Loading } from 'umi';
import { Layout, message, Alert, Spin } from 'antd';
import Add_Edit_BookModal from '@/components/admin/Add_Edit_BookModal';
import BookList from '@/components/admin/BookList';
import { bookRecordValue, FormValues, userAllType } from '@/pages/data';
import { BookModelState } from '@/models/book';
import moment from 'moment';
import {
  admin_addBookRecord,
  admin_editBookRecord,
  admin_deleteBookRecord,
} from '@/services/book';
import { LoadingOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout; //不能删除，删除样式就没了，不知为何
import { getUserInfo } from '@/services/user';

interface ListProps {
  bookModelLoading: boolean;
  books: bookRecordValue[];
  page: number;
  page_size: number;
  total_count: number;
  dispatch: Dispatch;
  orderTypes: string;
}

const AdminBookList: FC<ListProps> = (props) => {
  const {
    bookModelLoading,
    books,
    page,
    page_size,
    total_count,
    dispatch,
    orderTypes,
  } = props;

  console.log('AdminBookList_orderTypes　＝　', orderTypes);

  //判断是不是管理员，是否能有增加删除修改书的操作
  const [adminAction, setAdminAction] = useState(false);
  useEffect(() => {
    getUserInfo().then((value) => {
      console.log('AdminBookList_value = ', value);
      if (value.code === 0 && value.data.role === '2') {
        setAdminAction(true);
      }
    });
  }, []);

  const [add_edit_BookModalVisible, setAdd_edit_BookModalVisible] = useState(
    false,
  ); //添加书Modal是否可见
  const [bookRecord, setBookRecord] = useState<bookRecordValue | undefined>(
    undefined,
  ); //一条书信息
  const [bookSubmitLoading, setBookSubmitLoading] = useState(false);

  //获取所有书
  const getAllBook = () => {
    getBookList(1, 4);
    setSearchId('');
    setSearchAuthorOrTitle('');
  };
  //通过书作者或书名获取书信息
  const toSearchByAuthorOrTitle = (page: number, page_size: number) => {
    dispatch({
      type: 'book/goSearch_byAuthorOrTitle',
      payload: {
        page,
        page_size,
        orderTypes,
        author: searchOption === 'author' ? searchAuthorOrTitle : '',
        title: searchOption === 'title' ? searchAuthorOrTitle : '',
      },
    });
  };

  //页码变换
  const onPageChange = (page: number, pageSize?: number) => {
    console.log('searchAuthorOrTitle = ', searchAuthorOrTitle);
    console.log('onPageChange', page, page_size);
    if (pageSize) {
      if (searchAuthorOrTitle === '') {
        getBookList(page, pageSize);
      } else {
        toSearchByAuthorOrTitle(page, pageSize);
      }
    } else {
      if (searchAuthorOrTitle === '') {
        getBookList(page, page_size);
      } else {
        toSearchByAuthorOrTitle(page, page_size);
      }
    }
  };

  //刷新(获取书列表)
  const getBookList = (page: number, page_size: number) => {
    dispatch({
      type: 'book/getBookList',
      payload: {
        page,
        page_size,
        orderTypes,
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
    message.error('取消提交');
  };
  //提交
  const onSubmitBookModal = async (formValues: FormValues) => {
    setBookSubmitLoading(true);
    console.log('FormValues = ', formValues);
    const {
      cover_uri,
      title,
      authors,
      pub,
      pub_date,
      price,
      retail_price,
      describe,
    } = formValues;

    const values = {
      cover_uri: cover_uri ? cover_uri[0].response.data.file_uri : null,
      title: title === '' ? null : title,
      authors: authors === '' ? null : authors,
      pub: pub === '' ? null : pub,
      pub_date: pub_date ? moment(pub_date).format('YYYY-MM-DD') : null,
      price: price === '' ? null : price,
      retail_price: retail_price === '' ? null : retail_price,
      describe: describe === '' ? null : describe,
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
    // dispatch({
    //   type: 'book/admin_deleteBook',
    //   payload: {
    //     book_id: id,
    //   },
    // });
    admin_deleteBookRecord({ book_id: id }).then((value) => {
      console.log('admin_deleteBookRecord_value = ', value);
      if (value.code === 0) {
        message.success('删除成功');
        getBookList(1, 4);
      } else {
        message.error(value.message);
      }
    });
  };
  // 编辑书
  const clickEditBook = (bookRecord: bookRecordValue) => {
    setAdd_edit_BookModalVisible(true);
    setBookRecord(bookRecord);
    console.log('clickEditBook', bookRecord);
  };

  //监听搜索框 按书id
  const [searchId, setSearchId] = useState('');
  const idOnChange = (value: string) => {
    // console.log("searchValueChange = ",value)
    if (value === '') {
      getBookList(1, 4);
      setSearchAuthorOrTitle('');
    }
    setSearchId(value);
  };
  //监听搜索框 按作者和书名
  const [searchAuthorOrTitle, setSearchAuthorOrTitle] = useState('');
  const authorOrTitleOnChange = (value: string) => {
    // console.log("searchValueChange = ",value)
    if (value === '') {
      getBookList(1, 4);
      setSearchId('');
    }
    setSearchAuthorOrTitle(value);
  };

  //搜索类别
  const [searchOption, setSearchOption] = useState('author');
  const selectOnChange = (option: any) => {
    console.log('selectOnChange = ', option);
    if (option === 'title') {
      setSearchOption(option);
    }
  };
  //通过id查找书
  const goSearchById = (id: string) => {
    // console.log("goSearchById_id = ", id)
    setSearchAuthorOrTitle('');
    const idTrim = id.trim(); //去除字符前后空格
    const regId = /^\d+$/; //判断为数字类型
    if (idTrim === '') {
      message.warning('搜索框为空或者输入的字符无效，请填写想搜索的内容！');
    } else if (!regId.test(id)) {
      message.warning('请输入正确的书编号！');
    } else {
      dispatch({
        type: 'book/getBook_byId',
        payload: {
          book_id: parseInt(idTrim),
        },
      });
    }
  };
  //通过作者或书名查找书
  const goSearchByAuthorOrTitle = (value: string) => {
    console.log('goSearchByAuthorOrTitle = ', value.trim());
    setSearchId('');
    const valueTrim = value.trim();
    setSearchAuthorOrTitle(value.trim());
    if (valueTrim === '') {
      message.warning('搜索框为空或者输入的字符无效，请填写想搜索的内容！');
    } else {
      toSearchByAuthorOrTitle(1, 4);
    }
  };

  // 加载图标
  const bookListLoadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <React.Fragment>
      {bookModelLoading ? (
        <Spin
          indicator={bookListLoadingIcon}
          style={{ position: 'relative', left: '47% ', top: '40%' }}
        />
      ) : (
        <BookList
          bookModelLoading={bookModelLoading}
          books={books}
          clickAddButton={clickAddButton}
          deleteBookConfirm={deleteBookConfirm}
          clickEditBook={clickEditBook}
          page={page}
          page_size={page_size}
          total_count={total_count}
          getAllBook={getAllBook}
          onPageChange={onPageChange}
          selectOnChange={selectOnChange}
          goSearchById={goSearchById}
          goSearchByAuthorOrTitle={goSearchByAuthorOrTitle}
          searchId={searchId}
          idOnChange={idOnChange}
          searchAuthorOrTitle={searchAuthorOrTitle}
          authorOrTitleOnChange={authorOrTitleOnChange}
          adminAction={adminAction}
        />
      )}
      <Add_Edit_BookModal
        add_edit_BookModalVisible={add_edit_BookModalVisible}
        onSubmitBookModal={onSubmitBookModal}
        onCancelBookModal={onCancelBookModal}
        bookRecord={bookRecord}
        bookSubmitLoading={bookSubmitLoading}
      />
    </React.Fragment>
  );
};

export default connect(
  ({ book, loading }: { book: BookModelState; loading: Loading }) => {
    return {
      bookModelLoading: loading.models.book,
      books: book.books,
      page: book.page,
      page_size: book.page_size,
      total_count: book.total_count,
      // orderTypes: book.orderTypes,
    };
  },
)(AdminBookList);
