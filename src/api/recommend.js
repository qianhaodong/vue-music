import { BASE_URL } from './config'
import axios from 'axios'

export function getRecommend() { // 获取推荐轮播
  const url = BASE_URL + '/banner'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList() { // 获取歌单列表
  const url = BASE_URL + '/personalized'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscDetail(discId) { // 获取 歌单/排行 详情
  const url = BASE_URL + '/playlist/detail'
  const data = Object.assign({}, {
    id: discId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
