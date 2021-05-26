import React, { useState, FC } from 'react';
import { connect, Dispatch, Loading } from 'umi';
import { Layout, message, Alert } from 'antd';
import Add_Edit_BookModal from '@/components/admin/Add_Edit_BookModal';
import BookList from '@/components/admin/BookList';
import { bookRecordValue, FormValues } from '@/pages/data';
import { BookModelState } from '@/models/book';
import moment from 'moment';
import { admin_addBookRecord, admin_editBookRecord } from '@/services/book';
const { Header, Content, Footer } = Layout; //不能删除，删除样式就没了，不知为何

interface ListProps {
  bookListLoading: boolean;
  books: bookRecordValue[];
  page: number;
  page_size: number;
  total_count: number;
  dispatch: Dispatch;
}

const AdminBookList: FC<ListProps> = (props) => {
  const {
    bookListLoading,
    books,
    page,
    page_size,
    total_count,
    dispatch,
  } = props;

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
      price,
      retail_price,
      describe,
    } = formValues;

    const values = {
      ...formValues,
      cover_uri: cover_uri ? cover_uri[0].response.data.file_uri : null,
      title: title === '' ? null : title,
      authors: authors === '' ? null : authors,
      pub: pub === '' ? null : pub,
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
      // dispatch({
      //   type:'book/goSearch_byAuthorOrTitle',
      //   payload:{
      //     page:1,
      //     page_size:4,
      //     author: searchOption === 'author' ? valueTrim : "",
      //     title: searchOption === 'title' ? valueTrim : "",
      //   }
      // })
    }
  };

  return (
    <React.Fragment>
      <BookList
        bookListLoading={bookListLoading}
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
      />
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
      bookListLoading: loading.models.book,
      books: book.books,
      page: book.page,
      page_size: book.page_size,
      total_count: book.total_count,
    };
  },
)(AdminBookList);
