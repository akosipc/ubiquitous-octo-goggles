import axios from 'axios'
import useSWR from 'swr'

const defaultQueryParams = { page: 1, perPage: 25 }

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json'
axios.defaults.headers.common['Authorization'] = 'hwUKatWG47scxKDyXlsbrtntRcXNMSBJhWgdOLLD'
axios.defaults.headers.common['Authorization-Type'] = 'v1'

const fetcher = url => { axios.get(url).then(res => res.data) }

export const fetchTournaments = () => {
  const { data, error } = useSWR('https://labs.challonge.online/v2/tournaments', fetcher)

  return {
    tournaments: data,
    isLoading: !error && !data,
    isError: error
  }
}
