import Link from 'next/link'

const Dashboard = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Breadcrumbs/>

      <main className='container mx-auto p-4'>
        { children }
      </main>
    </>
  )
}

const Sidebar = () => {
  return (
    <nav className='fixed bg-teal-900 text-blue-100 w-12 max-h-screen h-screen font-black'>
      <div className='flex flex-col m-2'>
        <Logo/>
        <Navbar/>
      </div>
    </nav>
  )
}

const Logo = () => {
  return (
    <Link href='/'>
      <a className='p-2 font-sans bg-gray-900 rounded-full text-center text-sm leading-4'>
        /\
      </a>
    </Link>
  )
}

const Navbar = () => {
  return (
    <ul className='mt-8'>
    </ul>
  )
}

const Breadcrumbs = () => {
  return (
    <div>
    </div>
  )
}


export default Dashboard
