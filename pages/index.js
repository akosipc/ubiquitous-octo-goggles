import Head from 'next/head'
import Link from 'next/link'

import Dashboard from '../components/Layout/Dashboard'
import Spinner from '../components/Shared/Spinner'
import ErrorBoundary from '../components/Shared/ErrorBoundary'

import { fetchTournaments } from '../lib/ChallongeClient'

const HomePage = () => {
  const { tournaments, isLoading, isError } = fetchTournaments()

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>

  return (
    <>
      <Head>
        <title> Dashboard - BYB </title>
      </Head>
      <Dashboard>
        {
          tournaments.map((tournament, index) => {
            return (
              <Link 
                  as={ `${tournament.id}/${tournament.currentMatch.id}` } 
                  key={ index }
                  href="/[tournamentUrl]/[matchId]" > 
                <a>
                  Test 
                </a>
              </Link>
            )
          })
        }
      </Dashboard>
    </>
  )
}

export default HomePage
