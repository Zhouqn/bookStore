import { history } from 'umi';

export const appName = '轻书评';

//5秒后页面跳转
let timeInterval: any;
const timeChange = (timeInterval: any) => {
  // 获取初始时间
  let time = document.getElementById('timeChange');
  // 获取到id为timeChange标签中的数字时间
  if (time) {
    if (parseInt(time.innerHTML) === 1) {
      // 等于0时清除计时，并跳转该指定页面
      history.push('/user/login');
      window.clearInterval(timeInterval);
    } else {
      time.innerHTML = String(parseInt(time.innerHTML) - 1);
    }
  }
};
export const timeCall = () => {
  //1s调用一次
  timeInterval = window.setInterval(() => {
    timeChange(timeInterval);
  }, 1000);
};
