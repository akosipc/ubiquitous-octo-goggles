import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/client'

import Layout from '../../components/Layout/Layout'
import Spinner from '../../components/Shared/Spinner'
import BlankSlate from '../../components/Shared/BlankSlate'
import ErrorBoundary from '../../components/Shared/ErrorBoundary'

import TournamentHeader from '../../components/Tournament/Header'

import { fetchTournament } from '../../lib/ChallongeClient'

const TournamentPage = ({ session, url }) => {
  const { tournament, matches, participants, isLoading, isError } = fetchTournament(url, session.accessToken)

  console.log(participants)
  console.log(matches)

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

        { renderMatches() }
        { renderParticipants() }
      </Layout>
    </>
  )
}

const renderMatches = () => {
}

const renderParticipants = () => {
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
