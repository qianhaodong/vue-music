import { BASE_URL } from './config'
import axios from 'axios'

export function getHotKey() { // 获取热门搜索
  const url = BASE_URL + '/search/hot'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function search(key, limit, offset) {
  const url = BASE_URL + '/search'
  const data = Object.assign({}, {
    keywords: key,
    limit: limit,
    offset: offset
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
