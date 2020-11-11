import Head from 'next/head'

import Layout from '../components/Layout/Layout'
import Fetcher from '../components/Shared/Fetcher'

const Dashboard = () => {
  return (
    <Layout>
      <Head>
        <title> Dashboard - Some Interesting Title </title>
      </Head>

      <Fetcher />
    </Layout>
  )
}

export default Dashboard
