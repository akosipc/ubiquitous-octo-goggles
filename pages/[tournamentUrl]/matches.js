import Head from 'next/head'
import Link from 'next/link'

import { find, filter, capitalize } from 'lodash'

import Spinner from '../../components/Shared/Spinner'
import Dashboard from '../../components/Layout/Dashboard'
import BlankSlate from '../../components/Shared/BlankSlate'
import ErrorBoundary from '../../components/Shared/ErrorBoundary'

import { fetchTournament } from '../../lib/ChallongeClient'

const selectMatches = (collection = []) => {
  return filter(collection, { type: 'match' })
}

const selectParticipants = (collection = []) => {
  return filter(collection, { type: 'participant' })
}

const Matches = ({ tournamentUrl }) => {
  const { tournament, included, isLoading, isError } = fetchTournament(tournamentUrl)

  const matches = selectMatches(included)
  const participants = selectParticipants(included)

  console.log(matches)

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>
  if (matches.length === 0) return <BlankSlate/>

  return (
    <>
      <Head>
        <title> { tournament.attributes.name } Matches - BYB </title>
      </Head>
      <Dashboard>
        <h1 className='text-2xl font-bold'> { tournament.attributes.name } </h1>

        <div className='flex text-purple-700 items-start text-sm'>
          <span className='mr-8'>
            { capitalize(tournament.attributes.tournamentType) }
          </span>

          <span className='mx-8'>
            { `Tournament is currently ${tournament.attributes.state}` }
          </span>

          <span className='mx-8'>
            { `${tournament.relationships.matches.data.length} Matches` } 
          </span>

          <span className='mx-8'>
            { `${tournament.relationships.participants.data.length} Participants` }
          </span>
        </div>

        <hr className='mt-4 mb-8'/>

        <div className='grid grid-cols-3 gap-4'>
          {
            matches.map((match, index) => {
              return (
                <Link
                  as={ `${tournamentUrl}/${match.id}` }
                  key={ index }
                  href="/[tournamentUrl]/[matchId]"
                >
                  <a>
                    <div className=''>
                      { `Round: ${match.attributes.round}` }
                    </div>
                  </a>
                </Link>
              )
            })
          }
        </div>
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
