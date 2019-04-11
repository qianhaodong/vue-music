import { BASE_URL } from './config'
import axios from 'axios'

export function getSingerList() { // 获取歌手列表
  const url = BASE_URL + '/toplist/artist'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail(singerId) { // 获取歌手详情
  const url = BASE_URL + '/artists'

  const data = Object.assign({}, {
    id: singerId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
