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

export const login = ({email}) => {
  const { data, error } = useSWR('https://animated-rotary-phone.herokuapp.com/users/sign_in', (url) => {
    return axios({
      url: url,
      data: {
        email: email,
        password: ''
      },
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/vnd.api+json'
      }
    })
  }).then(res => { return res })
}

export const logout = () => {
  const { data, error } = useSWR('https://animated-rotary-phone.herokuapp.com/users/sign_out', (url) => {
  })
}

export const fetchBets = () => {
}

export const makeBets = (data) => {
}
