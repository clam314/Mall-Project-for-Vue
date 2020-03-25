import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {
  SUCCESS_CODE,
  TIMEOUT
} from './config.js';

const CancelToken = axios.CancelToken;
let cancel;

export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次的请求！');
  cancel = null;

  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  }).then(res => {
    console.log(res);
    if (res.data.code === SUCCESS_CODE) {
      return res.data.content;
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log(err);
    } else {
      console.log(err);
    }
  });
}
