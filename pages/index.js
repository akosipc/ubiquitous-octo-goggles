import Head from 'next/head'

import Navbar from '../components/Layout/Navbar'
import Fetcher from '../components/Shared/Fetcher'

import { signIn, signOut, useSession } from 'next-auth/client'

const HomePage = () => {
  const [session, loading] = useSession()

  return (
    <main className='h-screen'>
      <Head>
        <title> Some Interesting Title </title>
        <meta>
        </meta>
      </Head>

      <Navbar session={ session }/>

      {
        session ?
        <>
          <Fetcher/>
        </> :
        <>
          <section className='flex align-center justify-center outline-none'>
            <button onClick={ signIn }>
              Sign In
            </button>
          </section>
        </>
      }
    </main>
  )
}

export default HomePage
