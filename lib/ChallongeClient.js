import axios from 'axios'
import useSWR from 'swr'

import { filter, groupBy } from 'lodash'

const fetcher = (url, authToken, data = {}, method = 'GET') => {
  return axios({
    url: url,
    data: data,
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/vnd.api+json',
      'authorization': authToken,
      'Authorization-Type': 'v2'
    }
  }).then(res => { return res.data })
}

export const fetchTournament = (url, authToken) => {
  const { data, error } = useSWR([`https://api.labs.challonge.online/v2/communities/0cf63f6eca776b94f03080b1/tournaments/${url}.json`, authToken], fetcher)

  return {
    participants: data === undefined ? undefined : filter(data.included, { type: 'participant' }),
    tournament: data === undefined ? undefined : data.data,
    matches: data === undefined ? undefined : selectMatches(data.included),
    isLoading: !error && !data,
    isError: error
  }
}

export const fetchMatch = (tournamentUrl, matchId, authToken) => {
  const { data, error } = useSWR([`https://api.labs.challonge.online/v2/communities/0cf63f6eca776b94f03080b1/tournaments/${tournamentUrl}/matches/${matchId}.json`, authToken], fetcher)

  return {
    matchParticipants: data === undefined ? undefined : filter(data.included, { type: 'participant' }),
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
