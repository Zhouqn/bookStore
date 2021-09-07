import React, { FC, useEffect } from 'react';
import { history } from 'umi';

const IndexPage: FC = () => {
  useEffect(() => {
    history.push('/user/book/list');
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default IndexPage;
