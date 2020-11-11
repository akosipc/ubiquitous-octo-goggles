import Head from 'next/head'

import Layout from '../components/Layout/Layout'
import Fetcher from '../components/Shared/Fetcher'

import { signIn, useSession } from 'next-auth/client'

const HomePage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div> Loading... </div>
  }

  return (
    <Layout>
      <Head>
        <title> Some Interesting Title </title>
      </Head>

      {
        session ?
        <Fetcher/> :
        <section className='flex align-center justify-center outline-none'>
          <button onClick={ () => { signIn('challonge', { callbackUrl: 'http://localhost:3000/dashboard' }) } }>
            Sign in via Challonge
          </button>
        </section>
      }
    </Layout>
  )
}

export default HomePage
