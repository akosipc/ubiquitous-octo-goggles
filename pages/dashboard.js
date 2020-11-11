import Head from 'next/head'

import Layout from '../components/Layout/Layout'
import Fetcher from '../components/Shared/Fetcher'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title> Dashboard - Some Interesting Title </title>
      </Head>
      <Layout>
        <Fetcher />
      </Layout>
    </>
  )
}

export default Dashboard
