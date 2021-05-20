import { message } from 'antd';
import { extend } from 'umi-request';

const doRequest = (url: string, options?: object) => {
  const errorHandler = function (error: any) {
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

  const extendRequest = extend({ errorHandler });

  return extendRequest(url, {
    method: 'get',
    ...options,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default doRequest;
