import Head from 'next/head'

import Dashboard from '../components/Layout/Dashboard'
import DashboardContainer from '../components/Dashboard/containers/DashboardContainer'

const HomePage = () => {
  return (
    <>
      <Head>
        <title> Dashboard - BYB </title>
      </Head>
      <Dashboard>
        <DashboardContainer />
      </Dashboard>
    </>
  )
}

export default HomePage
