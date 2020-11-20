import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url, authToken, data = {}, method = 'GET') => {
  return axios({
    url: url,
    data: data,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Authorization': authToken,
      'Content-Type': 'application/vnd.api+json'
    }
  }).then(res => { return res.data })
}


export const fetchTournamentBets = (tournamentUrl, authToken) => {
  const { data, error } = useSWR([`http://localhost:3000/tournaments/${tournamentUrl}/bets.json`, authToken], fetcher)

  return {
    bets: data === undefined ? undefined : data.data,
    isLoading: !error && !data,
    isError: error
  }
}

export const fetchMatchBets = (tournamentUrl, matchId, authToken) => {
  const { data, error } = useSWR([`http://localhost:3000/tournaments/${tournamentUrl}/matches/${matchId}/bets.json`], fetcher)

  return {
    bets: data === undefined ? undefined : data.data,
    isLoading: !error && !data,
    isError: error
  }
}

export const makeBet = ({ tournamentUrl, matchId, data }) => {

}
