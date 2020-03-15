import axios from 'axios';
import {
  SUCCESS_CODE,
  TIMEOUT
} from './config.js';

export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  }).then(res => {
    if (res.data.code === SUCCESS_CODE) {
      return res.data.slider;
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err);
    }
    return [{
      linkUrl: 'https://www.imooc.com',
      picUrl: require('assets/img/404.png')
    }]
  }).then(data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    })
  });
}
