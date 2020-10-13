import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url, data = {}, method = 'GET') => {
  return axios({
    url: url,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'hwUKatWG47scxKDyXlsbrtntRcXNMSBJhWgdOLLD',
      'Authorization-Type': 'v1'
    },
    data: data
  }).then(res => { return res.data })
}

export const fetchTournaments = () => {
  const { data, error } = useSWR('https://labs.challonge.online/v2/tournaments.json', fetcher)

  return {
    tournaments: data === undefined ? undefined : data.data,
    isLoading: !error && !data,
    isError: error
  }
}
