// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
import { BASE_URL } from './config'
import axios from 'axios'

export function getRecommend() {
  // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const url = BASE_URL + '/banner'

  // assign()方法 -- 用于对象的合并
  /* const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }) */

  // return jsonp(url, data, options)
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList() {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  // const url = '/api/getDiscList'
  const url = BASE_URL + '/personalized'

  /* const data = Object.assign({}, commonParams, {
    picmid: 1,
    platform: 'yqq.json',
    hostUin: 0,
    sortId: 5,
    sin: 0,
    ein: 19,
    categoryId: 10000000,
    needNewCode: 0,
    rnd: Math.random(),
    format: 'json'
  }) */

  // return jsonp(url, data, options)
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
