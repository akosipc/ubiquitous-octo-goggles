import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url, data = {}, method = 'GET') => {
  return axios({
    url: url,
    data: data,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/vnd.api+json'
    }
  }).then(res => { return res.data })
}

export const fetchBets = () => {
}

export const makeBets = (data) => {
}
