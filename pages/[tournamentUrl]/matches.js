import Head from 'next/head'
import Link from 'next/link'

import { find, filter, capitalize } from 'lodash'

import Spinner from '../../components/Shared/Spinner'
import Dashboard from '../../components/Layout/Dashboard'
import BlankSlate from '../../components/Shared/BlankSlate'
import ErrorBoundary from '../../components/Shared/ErrorBoundary'

import MatchCard from '../../components/Match/Card'

import { fetchTournament } from '../../lib/ChallongeClient'

const selectMatches = (collection = []) => { return filter(collection, { type: 'match' }) }
const selectParticipants = (collection = []) => { return filter(collection, { type: 'participant' }) }

const renderMatches = (tournamentUrl, matches = []) => {
  if (matches.length === 0) {
    return <BlankSlate/>
  } else {
    return (
      <div className='grid grid-cols-3 gap-4'>
        {
          matches.map((match, index) => {
            return (
              <Link
                as={ `/${tournamentUrl}/matches/${match.id}` }
                key={ index }
                href="/[tournamentUrl]/matches/[matchId]"
              >
                <a>
                  <MatchCard />
                </a>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

const Header = ({ tournament, matchesCount, participantsCount }) => {
  return (
    <>
      <h1 className='text-2xl font-bold'> 
        { tournament.name } 
      </h1>

      <div className='flex text-purple-700 items-start text-sm'>
        <span className='mr-8'>
          { capitalize(tournament.type) }
        </span>

        <span className='mx-8'>
          { `Tournament is currently ${tournament.state}` }
        </span>

        <span className='mx-8'>
          { `${matchesCount} Matches` } 
        </span>

        <span className='mx-8'>
          { `${participantsCount} Participants` }
        </span>
      </div>
    </>
  )
}

const Matches = ({ tournamentUrl }) => {
  const { tournament, included, isLoading, isError } = fetchTournament(tournamentUrl)

  const matches = selectMatches(included)
  const participants = selectParticipants(included)

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>
  if (matches.length === 0) return <BlankSlate/>

  return (
    <>
      <Head>
        <title> { tournament.attributes.name } Matches - BYB </title>
      </Head>
      <Dashboard>
        <Header
          tournament={{
            name: tournament.attributes.name,
            type: tournament.attributes.tournamentType,
            state: tournament.attributes.state
          }}
          matchesCount={tournament.relationships.matches.data.length}
          participantsCount={tournament.relationships.participants.data.length}
        />

        <hr className='mt-4 mb-8'/>

        { renderMatches(tournamentUrl, matches) }
      </Dashboard>
    </>
  )
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      tournamentUrl: params.tournamentUrl
    }
  }
}


export default Matches
