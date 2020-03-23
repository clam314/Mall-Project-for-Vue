import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {
  SUCCESS_CODE,
  TIMEOUT,
  jsonpOptions,
  HOME_RECOMMEND_PAGE_SIZE
} from './config.js';

const shuffle = (arr) => {
  const arrLength = arr.length;
  let i = arrLength;
  let rndNum;
  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]];
    }
  }
  return arr;
}

export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  }).then(res => {
    if (res.data.code === SUCCESS_CODE) {
      let sliders = res.data.slider;
      const slider = [sliders[Math.floor(Math.random() * sliders.length)]];
      sliders = shuffle(sliders.filter(() => Math.random() > 0.9));
      if (sliders.length === 0) {
        sliders = slider;
      }
      return sliders;
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
  });
}

export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res;
    }
    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  });
};
