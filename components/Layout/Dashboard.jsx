import Link from 'next/link'

const Dashboard = ({ children }) => {
  return (
    <div>
      <Sidebar />
      
      { children }
    </div>
  )
}

const Sidebar = () => {
  return (
    <>
      <Logo/>
      <Navbar/>
    </>
  )
}

const Logo = () => {
  return (
    <Link href='/'>
      <a>
        Tite
      </a>
    </Link>
  )
}

const Navbar = () => {
  return (
    <ul>
    </ul>
  )
}


export default Dashboard
