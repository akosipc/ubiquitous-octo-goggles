import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url, data = {}, method = 'GET') => {
  return axios({
    url: url,
    data: data,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'hwUKatWG47scxKDyXlsbrtntRcXNMSBJhWgdOLLD',
      'Authorization-Type': 'v1'
    }
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

export const fetchTournament = (url) => {
  const { data, error } = useSWR(`https://labs.challonge.online/v2/tournaments/${url}.json`, fetcher)

  return {
    tournament: data === undefined ? undefined : data.data,
    isLoading: !error && !data,
    included: data === undefined ? undefined : data.included,
    isError: error
  }
}

export const fetchMatch = (tournamentUrl, matchId) => {
  const { data, error } = useSWR(`https://labs.challonge.online/v2/tournaments/${tournamentUrl}/matches/${matchId}.json`, fetcher)

  return {
    match: data === undefined ? undefined : data.data,
    isLoading: !error && !data,
    isError: error
  }
}
