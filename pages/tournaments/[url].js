import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/client'
import { filter, includes } from 'lodash'

import Layout from '../../components/Layout/Layout'
import Spinner from '../../components/Shared/Spinner'
import BlankSlate from '../../components/Shared/BlankSlate'
import ErrorBoundary from '../../components/Shared/ErrorBoundary'

import MatchCard from '../../components/Match/Card'
import TournamentHeader from '../../components/Tournament/Header'

import { fetchTournament } from '../../lib/ChallongeClient'

const TournamentPage = ({ session, url }) => {
  const { tournament, matches, participants, isLoading, isError } = fetchTournament(url, session.accessToken)

  if (isLoading) return <Spinner />
  if (isError) return <ErrorBoundary />

  return (
    <>
      <Head>
        <title> { tournament.attributes.name } - Some Interesting Title </title>
      </Head>
      <Layout>
        <TournamentHeader
          tournament={{
            name: tournament.attributes.name,
            type: tournament.attributes.tournamentType,
            state: tournament.attributes.state
          }}
          matchesCount={tournament.relationships.matches.data.length}
          participantsCount={tournament.relationships.participants.data.length}
        />

        <hr className="mt-4 mb-8 border-2 border-teal-700"/>

        { renderMatches(url, matches, participants) }
      </Layout>
    </>
  )
}

const renderMatches = (tournamentUrl, matches, participants) => {
  if (matches.length === 0) {
    return <BlankSlate />
  } else {
    const keys = Object.keys(matches)

    return (
      keys.map(key => {
        return (
          <section key={ key }>
            <h2 className='font-bold'>
              { `Round ${key}` }
            </h2>

            <div className='grid grid-cols-4 gap-4 my-2 mb-4'>
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

const selectMatchParticipants = (collection = [], identifiers) => { 
  return filter(collection, (participant) => {
    return identifiers.includes(participant.id)
  })
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session: session,
      url: context.params.url
    }
  }
}

export default TournamentPage 
