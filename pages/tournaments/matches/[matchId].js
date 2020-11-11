import Head from 'next/head'

import Layout from '../../../components/Layout/Layout'
import Spinner from '../../../components/Shared/Spinner'
import ErrorBoundary from '../../../components/Shared/ErrorBoundary'

import { fetchMatch } from '../../../lib/ChallongeClient'

const Match = ({ tournamentUrl, matchId }) => {
  const { match, participants, isLoading, isError } = fetchMatch(tournamentUrl, matchId)

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>

  return (
    <>
      <Head>
      </Head>
      <Layout>
      </Layout>
    </>
  )


export const getServerSideProps = ({ params }) => {
  return {
    props: {
      matchId: params.matchId,
      tournamentUrl: params.tournamentUrl
    }
  }
}

export default Match
