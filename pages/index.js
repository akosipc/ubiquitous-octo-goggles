import Head from 'next/head'
import Link from 'next/link'

import Dashboard from '../components/Layout/Dashboard'
import Spinner from '../components/Shared/Spinner'
import ErrorBoundary from '../components/Shared/ErrorBoundary'

import DashboardCard from '../components/Dashboard/Card'

import { fetchTournaments } from '../lib/ChallongeClient'

const HomePage = () => {
  const { tournaments, isLoading, isError } = fetchTournaments()

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>

  return (
    <>
      <Head>
        <title> Ongoing Tournaments - BYB </title>
      </Head>
      <Dashboard>
        {
          tournaments.map((tournament, index) => {
            return (
              <Link 
                  as={ `${tournament.id}/matches` } 
                  key={ index }
                  href="/[tournamentUrl]/matches" > 
                <a>
                  <DashboardCard
                    name={ tournament.attributes.name }
                    type={ tournament.attributes.tournamentType }
                    participantCount={ tournament.relationships.participants.links.meta.count }
                  />
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
