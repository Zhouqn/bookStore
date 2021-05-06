// import React from 'react';
// import { Button, Tooltip, Dropdown, Menu, Input } from 'antd';
// import { EllipsisOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
// import type { ProColumns } from '@ant-design/pro-table';
// import ProTable, { TableDropdown } from '@ant-design/pro-table';
// import {connect} from "umi";
// import Header from "@/pages/components/Header";
// import Footer from "@/pages/components/Footer";
// import adminStyles from "@/pages/admin/admin.css"
//
// const valueEnum = {
//   0: 'close',
//   1: 'running',
//   2: 'online',
//   3: 'error',
// };
//
// export type TableListItem = {
//   key: number;
//   name: string;
//   containers: number;
//   author_and_pub: string;
//   status: string;
//   createdAt: number;
//   progress: number;
//   money: number;
//   memo: string;
// };
// const tableListDataSource: TableListItem[] = [];
//
// const author_and_pub = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
//
// for (let i = 0; i < 5; i += 1) {
//   tableListDataSource.push({
//     key: i,
//     name: 'AppName',
//     containers: Math.floor(Math.random() * 20),
//     author_and_pub: author_and_pub[Math.floor(Math.random() * author_and_pub.length)],
//     status: valueEnum[Math.floor(Math.random() * 10) % 4],
//     createdAt: Date.now() - Math.floor(Math.random() * 2000),
//     money: Math.floor(Math.random() * 2000) * i,
//     progress: Math.ceil(Math.random() * 100) + 1,
//     memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
//   });
// }
//
// const columns: ProColumns<TableListItem>[] = [
//   {
//     title: '',
//     dataIndex: 'index',
//     valueType: 'indexBorder',
//     width: 48,
//   },
//   {
//     title: '书封面',
//     dataIndex: 'book',
//     render: (_) => <a>{_}</a>,
//     // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
//     // filterDropdown: () => (
//     //   <div style={{ padding: 8 }}>
//     //     <Input style={{ width: 188, marginBottom: 8, display: 'block' }} />
//     //   </div>
//     // ),
//     // filterIcon: (filtered) => (
//     //   <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//     // ),
//   },
//   {
//     title: '作者/出版社',
//     dataIndex: 'author_and_pub',
//     // valueEnum: {
//     //   all: { text: '全部' },
//     //   付小小: { text: '付小小' },
//     //   曲丽丽: { text: '曲丽丽' },
//     //   林东东: { text: '林东东' },
//     //   陈帅帅: { text: '陈帅帅' },
//     //   兼某某: { text: '兼某某' },
//     // },
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     initialValue: 'all',
//     filters: true,
//     onFilter: true,
//     valueEnum: {
//       all: { text: '全部', status: 'Default' },
//       close: { text: '关闭', status: 'Default' },
//       running: { text: '运行中', status: 'Processing' },
//       online: { text: '已上线', status: 'Success' },
//       error: { text: '异常', status: 'Error' },
//     },
//   },
//   {
//     title: (
//       <>
//         创建时间
//         <Tooltip placement="top" title="这是一段描述">
//           <QuestionCircleOutlined style={{ marginLeft: 4 }} />
//         </Tooltip>
//       </>
//     ),
//     width: 140,
//     key: 'since',
//     dataIndex: 'createdAt',
//     valueType: 'date',
//     sorter: (a, b) => a.createdAt - b.createdAt,
//   },
//   {
//     title: '备注',
//     dataIndex: 'memo',
//     ellipsis: true,
//     copyable: true,
//   },
//   {
//     title: '操作',
//     width: 180,
//     key: 'option',
//     valueType: 'option',
//     render: () => [
//       <a key="link">编辑</a>,
//       <a key="link2">查看</a>,
//     ],
//   },
// ];
//
// const List =  () => {
//   return (
//     <React.Fragment>
//       <Header/>
//       <ProTable<TableListItem>
//         className={adminStyles.proTable}
//         columns={columns}
//         request={(params, sorter, filter) => {
//           // 表单搜索项会从 params 传入，传递给后端接口。
//           console.log(params, sorter, filter);
//           return Promise.resolve({
//             data: tableListDataSource,
//             success: true,
//           });
//         }}
//         rowKey="key"
//         pagination={{
//           showQuickJumper: true,
//         }}
//         search={{
//           layout: 'vertical',
//           defaultCollapsed: false,
//         }}
//         dateFormatter="string"
//         toolbar={{
//           title: '书列表',
//           tooltip: 'bookList',
//         }}
//         toolBarRender={() => [
//           <Button key="show">添加</Button>,
//         ]}
//       />
//       <Footer/>
//     </React.Fragment>
//   );
// };
//
// export default  connect()(List)

import React, { lazy } from 'react';
import { connect } from 'umi';
import { Divider, Rate } from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import Top from '@/components/Header';
import Bottom from '@/components/Footer';
import adminStyles from '@/asset/css/admin.css';
import bookCover from '@/asset/imgs/bookCover.png';
import { appName } from '@/config';
import bookImg from '@/asset/imgs/book.png';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  AlignCenterOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const List = () => {
  return (
    <React.Fragment>
      {/*<div className={adminStyles.bookList}>*/}
      <Layout className={adminStyles.bookList}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className={adminStyles.logo}>
            <img alt="" src={bookImg} />
            <p>{appName}</p>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
            <Menu.Item
              key="1"
              icon={
                <AlignCenterOutlined
                  style={{ fontSize: '18px', marginRight: '25px' }}
                />
              }
              style={{ fontSize: '15px', marginTop: '50px' }}
            >
              书列表
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={
                <UserOutlined
                  style={{ fontSize: '18px', marginRight: '25px' }}
                />
              }
              style={{ fontSize: '15px', marginTop: '50px' }}
            >
              个人中心
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={adminStyles.site_layout_sub_header_background}>
            管理员页面
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className={adminStyles.site_layout_background}>
              <div className={adminStyles.oneLine}>
                <div className={adminStyles.oneBookRecord}>
                  <img alt="book" src={bookCover} />
                  <div className={adminStyles.bookAut_and_pub}>
                    <p>
                      书名: 格林童话
                      <Rate
                        className={adminStyles.bookRate}
                        allowHalf
                        defaultValue={4.3}
                      />
                    </p>
                    <p>作者: 安徒生</p>
                    <p>出版社: 大地出版社</p>
                    <p className={adminStyles.bookDescribe}>
                      这本书讲的是......
                    </p>
                  </div>
                </div>
                <div className={adminStyles.oneBookRecord}>
                  <img alt="book" src={bookCover} />
                  <div className={adminStyles.bookAut_and_pub}>
                    <p>
                      书名: 格林童话
                      <Rate
                        className={adminStyles.bookRate}
                        allowHalf
                        defaultValue={5}
                      />
                    </p>
                    <p>作者: 安徒生</p>
                    <p>出版社: 大地出版社</p>
                    <p className={adminStyles.bookDescribe}>
                      这本书讲的是......
                    </p>
                  </div>
                </div>
              </div>
              <Divider style={{ borderColor: 'gray' }} dashed />
              <div className={adminStyles.oneLine}>
                <div className={adminStyles.oneBookRecord}>
                  <img alt="book" src={bookCover} />
                  <div className={adminStyles.bookAut_and_pub}>
                    <p>
                      书名: 格林童话
                      <Rate
                        className={adminStyles.bookRate}
                        allowHalf
                        defaultValue={4.3}
                      />
                    </p>
                    <p>作者: 安徒生</p>
                    <p>出版社: 大地出版社</p>
                    <p className={adminStyles.bookDescribe}>
                      这本书讲的是......
                    </p>
                  </div>

                  <div className={adminStyles.oneBookRecord}>
                    <img alt="book" src={bookCover} />
                    <div className={adminStyles.bookAut_and_pub}>
                      <p>
                        书名: 格林童话
                        <Rate
                          className={adminStyles.bookRate}
                          allowHalf
                          defaultValue={4.3}
                        />
                      </p>
                      <p>作者: 安徒生</p>
                      <p>出版社: 大地出版社</p>
                      <p className={adminStyles.bookDescribe}>
                        这本书讲的是......
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Divider style={{ borderColor: 'gray' }} dashed />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      ,{/*</div>*/}
      <Bottom />
    </React.Fragment>
  );
};

export default connect()(List);
