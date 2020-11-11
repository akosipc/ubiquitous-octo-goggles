import Navbar from './Navbar'

import { useSession } from 'next-auth/client'

const Layout = ({ children }) => {
  const [session, loading] = useSession()

  return (
    <main className='h-screen'>
      <Navbar session={ session }/>
      <section className='container mx-auto'>
        { children }
      </section>
    </main>
  )
}

export default Layout
