import { LYRIC_URL } from './config'
import axios from 'axios'

export function getLyric(id) { // 获取歌词
  const url = LYRIC_URL
  const data = Object.assign({}, {
    type: 'lyric',
    id: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
