import Head from 'next/head'

import Dashboard from '../../components/Layout/Dashboard'

const Match = ({}) => {
  return (
    <Dashboard>
      <Head>
      </Head>

      <article>
      </article>
    </Dashboard>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { tournamentUrl: '1234', matchId: '1' } },
      { params: { tournamentUrl: '12345', matchId: '2' } }
    ],
    fallback: false
  }
}

export const getStaticProps = ({params}) => {
  return {
    props: { xx: 'xx' }
  }
}

export default Match
