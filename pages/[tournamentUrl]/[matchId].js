import Head from 'next/head'

import Spinner from '../../components/Shared/Spinner'
import Dashboard from '../../components/Layout/Dashboard'
import ErrorBoundary from '../../components/Shared/ErrorBoundary'

const Match = ({ tournamentUrl, matchId }) => {
  const { match, isLoading, isError } = fetchMatch(tournamentUrl, matchId)

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>

  return (
    <>
      <Head>
      </Head>
      <Dashboard>
      </Dashboard>
    </>
  )
}

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      matchId: params.matchId,
      tournamentUrl: params.tournamentUrl
    }
  }
}

export default Match
