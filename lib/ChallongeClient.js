import axios from 'axios'
import useSWR from 'swr'

import { filter, groupBy } from 'lodash'

const fetcher = (url, data = {}, method = 'GET') => {
  return axios({
    url: url,
    data: data,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/vnd.api+json',
      'authorization': 'c16m1c8xrjhhlds33zpnulajm6daf',
      'Authorization-Type': 'v1'
    }
  }).then(res => { return res.data })
}

export const fetchTournaments = () => {
  const { data, error } = useSWR('https://api.challonge.com/v2/tournaments.json', fetcher)

  return {
    tournaments: data === undefined ? undefined : data.data,
    isLoading: !error && !data,
    isError: error
  }
}

export const fetchTournament = (url) => {
  const { data, error } = useSWR(`https://api.challonge.com/v2/tournaments/${url}.json`, fetcher)

  return {
    participants: data === undefined ? undefined : filter(data.included, { type: 'participant' }),
    tournament: data === undefined ? undefined : data.data,
    matches: data === undefined ? undefined : selectMatches(data.included),
    isLoading: !error && !data,
    isError: error
  }
}

export const fetchMatch = (tournamentUrl, matchId) => {
  const { data, error } = useSWR(`https://api.challonge.com/v2/tournaments/${tournamentUrl}/matches/${matchId}.json`, fetcher)

  return {
    participants: data === undefined ? undefined : filter(data.included, { type: 'participant' }),
    isLoading: !error && !data,
    isError: error,
    match: data === undefined ? undefined : data.data,
  }
}

const selectMatches = (collection = []) => { 
  if (collection.length === 0) {
    return []
  } else {
    return groupBy(filter(collection, { type: 'match' }), (match) => { return match.attributes.round })
  }
}
