import { BASE_URL } from './config'
import axios from 'axios'

export function getRankList() {
  const url = BASE_URL + '/toplist/detail'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
