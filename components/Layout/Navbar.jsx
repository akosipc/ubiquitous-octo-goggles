import Link from 'next/link'

import { signIn, signOut } from 'next-auth/client'

const Navbar = ({ session }) => {
  return (
    <ul className='flex align-items justify-end text-gray-100 bg-gray-900 text-sm font-bold'>
      {
        session ?
          <>
            <Link href='/'>
              <li className='px-4 py-2 cursor-pointer hover:text-gray-500 transition duration-500 ease-in-out'>
                Home
              </li>
            </Link>
            <a onClick={ signOut } className='px-4 py-2 cursor-pointer hover:text-gray-500 transition duration-500 ease-in-out'>
              <li>
                Sign Out
              </li>
            </a>
          </>
          :
          <>
            <a onClick={ signIn } className='px-4 py-2 cursor-pointer hover:text-gray-500 transition duration-500 ease-in-out'>
              <li>
                Sign In
              </li>
            </a>
          </>
      
      }
    </ul>
  )
}

export default Navbar
