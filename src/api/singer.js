// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
import { BASE_URL } from './config'
import axios from 'axios'

export function getSingerList() {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  /* const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 5381
  }) */
  const url = BASE_URL + '/toplist/artist'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
  // return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const url = BASE_URL + '/artists'

  const data = Object.assign({}, {
    id: singerId
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
