import { signIn, signOut, useSession } from 'next-auth/client'

const HomePage = () => {
  const [session, loading] = useSession()

  return (
    <>
      {
        session ?
        <>
          Signed in as { session.user.email } <br/>
          <button onClick={ signOut }>
            Sign Out
          </button>
        </> :
        <>
          Not signed in <br/>
          <button onClick={ signIn }>
            Sign In
          </button>
        </>
      }
    </>
  )
}

export default HomePage
