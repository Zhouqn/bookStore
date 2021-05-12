import React, { FC } from 'react';
import { Divider, Image } from 'antd';
import userStyles from '@/asset/css/user.css';
import noBookCover from '@/asset/imgs/noBookCover.png';

interface NewBooksProps {
  // newBooks:[]
}

const newBooks = [
  {
    id: 1,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 2,
    cover_uri: '/image/book1',
    title: 'python',
    author: 'jack',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 30,
    retail_price: 25.5,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 3,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 47.5,
    retail_price: 36,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 4,
    cover_uri: '/image/book1',
    title: 'Java',
    author: 'nick',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 5,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 45.8,
    retail_price: 32.5,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 6,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 55.0,
    retail_price: 37.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 7,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 8,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 9,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 30,
    retail_price: 25.8,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 10,
    cover_uri: '/image/book1',
    title: '格林童话',
    author: '安徒生',
    pub: '大地出版社',
    published_time: '2020-3-21',
    price: 40.5,
    retail_price: 30.2,
    description:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
];

const HotBookList: FC<NewBooksProps> = () => {
  return (
    <React.Fragment>
      <p>
        <span style={{ fontSize: '18px' }}>高分书籍：</span>
        <a>查看全部书籍</a>
      </p>
      <Divider />
      <div className={userStyles.newBooks}>
        {newBooks.map((bookRecord, i) => {
          return (
            <div className={userStyles.newBookRecord}>
              <Image
                alt="bookCover"
                src={bookRecord.cover_uri}
                fallback={noBookCover}
              />
              <div>{bookRecord.title}</div>
              <div>{bookRecord.author}</div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default HotBookList;
