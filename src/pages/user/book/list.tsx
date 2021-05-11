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

const UserBookList: FC<ListProps> = ({ books, dispatch }) => {
  return <React.Fragment></React.Fragment>;
};

export default connect(({ book }: { book: BookState }) => {
  return {
    books: book.books,
  };
})(UserBookList);
