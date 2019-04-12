import { BASE_URL } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = BASE_URL + '/search/hot'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
