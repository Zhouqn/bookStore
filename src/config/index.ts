import { message } from 'antd';

export const appName = 'xx图书系统';

export const errorHandler = function (error: any) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    console.log(error.response.status);
    console.log(error.data);
    if (error.response.status) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    message.error('Network Error');
    console.log(error.message);
  }
  throw error;
};

export const newBooks = [
  {
    id: 1,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 2,
    cover_uri: '/image/book1',
    title: 'python',
    authors: 'jack',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 30,
    retail_price: 25.5,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 3,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 47.5,
    retail_price: 36,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 4,
    cover_uri: '/image/book1',
    title: 'Java',
    authors: 'nick',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 5,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 45.8,
    retail_price: 32.5,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 6,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 55.0,
    retail_price: 37.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 7,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 8,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 9,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 30,
    retail_price: 25.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 10,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 30.2,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
];

export const highRateBooks = [
  {
    id: 1,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 2,
    cover_uri: '/image/book1',
    title: 'python',
    authors: 'jack',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 30,
    retail_price: 25.5,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 3,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 47.5,
    retail_price: 36,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 4,
    cover_uri: '/image/book1',
    title: 'Java',
    authors: 'nick',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 5,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 45.8,
    retail_price: 32.5,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 6,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 55.0,
    retail_price: 37.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 7,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 8,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 9,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 30,
    retail_price: 25.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 10,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 30.2,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
];

export const hotBooks = [
  {
    id: 1,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 2,
    cover_uri: '/image/book1',
    title: 'python',
    authors: 'jack',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 30,
    retail_price: 25.5,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 3,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 47.5,
    retail_price: 36,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 4,
    cover_uri: '/image/book1',
    title: 'Java',
    authors: 'nick',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 5,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 45.8,
    retail_price: 32.5,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 6,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 55.0,
    retail_price: 37.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 7,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 35.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 8,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 35.8,
    retail_price: 34.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 9,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 30,
    retail_price: 25.8,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
  {
    id: 10,
    cover_uri: '/image/book1',
    title: '格林童话',
    authors: '安徒生',
    pub: '大地出版社',
    pub_date: '2020-3-21',
    price: 40.5,
    retail_price: 30.2,
    describe:
      '这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣，这本书讲了很多适合小朋友的故事, 生动有趣',
    rate: 4.3,
  },
];
