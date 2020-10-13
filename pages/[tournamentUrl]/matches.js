import Head from 'next/head'
import Link from 'next/link'

import Dashboard from '../../components/Layout/Dashboard'

const Matches = () => {
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
  const { tournamentUrl } = params

  return {
    props: {}
  }
}


export default Matches
