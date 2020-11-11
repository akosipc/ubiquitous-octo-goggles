import Head from 'next/head'
import Link from 'next/link'

import { filter, includes } from 'lodash'

import Spinner from '../../components/Shared/Spinner'
import Dashboard from '../../components/Layout/Dashboard'
import BlankSlate from '../../components/Shared/BlankSlate'
import ErrorBoundary from '../../components/Shared/ErrorBoundary'

import TournamentHeader from '../../components/Tournament/Header'
import MatchCard from '../../components/Match/Card'

import { fetchTournament } from '../../lib/ChallongeClient'

const selectMatchParticipants = (collection = [], identifiers) => { 
  return filter(collection, (participant) => {
    return identifiers.includes(participant.id)
  })
}

const renderMatches = (tournamentUrl, matches = [], participants = []) => {
  if (matches.length === 0) {
    return <BlankSlate/>
  } else {
    const keys = Object.keys(matches)

    return (
      keys.map(key => {
        return (
          <section 
            key={ key }>

            <h2 className='font-bold'>
              { `Round ${key}` }
            </h2>

            <div className='grid grid-cols-3 gap-4 my-2 mb-4'>
              {
                matches[key].map((match, index) => {
                  return (
                    <Link
                      as={ `/${tournamentUrl}/matches/${match.id}` }
                      key={ index }
                      href="/[tournamentUrl]/matches/[matchId]"
                    >
                      <a>
                        <MatchCard 
                          state={ match.attributes.state }
                          identifier={ match.attributes.identifier }
                          participants={
                            selectMatchParticipants(participants, [match.relationships.player1.data.id, match.relationships.player2.data.id])
                          }
                        />
                      </a>
                    </Link>
                  )
                })
              }
            </div>
          </section>
        )
      })
    )
  }
}

const Matches = ({ tournamentUrl }) => {
  const { tournament, matches, participants, isLoading, isError } = fetchTournament(tournamentUrl)

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>

  return (
    <>
      <Head>
        <title> { tournament.attributes.name } Matches - BYB </title>
      </Head>
      <Dashboard>
        <TournamentHeader
          tournament={{
            name: tournament.attributes.name,
            type: tournament.attributes.tournamentType,
            state: tournament.attributes.state
          }}
          matchesCount={tournament.relationships.matches.data.length}
          participantsCount={tournament.relationships.participants.data.length}
        />

        <hr className='mt-4 mb-8 border-2 border-teal-700'/>

        { renderMatches(tournamentUrl, matches, participants) }
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
