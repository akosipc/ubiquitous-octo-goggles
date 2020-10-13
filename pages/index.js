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
                  as={ `${tournament.id}/matches` } 
                  key={ index }
                  href="/[tournamentUrl]/matches" > 
                <a>
                  <div className='bg-white rounded-lg p-6'>
                    <img/>
                    <div className='text-left'>
                      <h2 className='text-lg'> { tournament.attributes.name } </h2>
                      <div className='text-purple-500'> { tournament.attributes.tournamentType } </div>

                      <div className='text-gray-600'>
                        { tournament.relationships.participants.links.meta.count }
                        &nbsp;
                        Participants
                      </div>
                    </div>
                  </div>
                  { tournament.attributes.timestamps.startsAt }
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
