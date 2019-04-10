import { BASE_URL } from './config'
import axios from 'axios'

export function getLyric(id) {
  const url = BASE_URL + '/lyric'
  const data = Object.assign({}, {
    id: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
