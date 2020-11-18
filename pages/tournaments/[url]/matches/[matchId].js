import Head from 'next/head'
import Modal from 'react-modal'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

import Layout from '../../../../components/Layout/Layout'
import Spinner from '../../../../components/Shared/Spinner'
import ErrorBoundary from '../../../../components/Shared/ErrorBoundary'

import MatchCollection from '../../../../components/Match/Collection'
import TournamentHeader from '../../../../components/Tournament/Header'

import { fetchTournament, fetchMatch } from '../../../../lib/ChallongeClient'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    marginRight: '-50%',
    minWidth: '480px'
  }
}

Modal.setAppElement('#__next')

const Match = ({ session, tournamentUrl, matchId }) => {
  const router = useRouter()
  const { match, matchParticipants, isLoading, isError } = fetchMatch(tournamentUrl, matchId, session.accessToken)
  const { tournament, matches, participants } = fetchTournament(tournamentUrl, session.accessToken)

  if (isLoading) return <Spinner/>
  if (isError) return <ErrorBoundary/>
  if (tournament === undefined) return <Spinner/>

  return (
    <>
      <Head>
      </Head>
      <Layout>
        <Modal
          style={ modalStyles }
          isOpen={ true }
          onRequestClose={ () => { router.push(`/tournaments/${tournamentUrl}`) } }
          contentLabel="Match Modal"
          shouldCloseOnOverlayClick={ true }
        >
          <header className='flex align-center justify-between'>
            <h1 className='text-2xl font-bold'>
              { `Match ${match.id}` } 
            </h1>

            <button onClick={ () => { router.push(`/tournaments/${tournamentUrl}`) } }>
              x
            </button>
          </header>

          <hr className="mt-4 mb-8 border-2 border-teal-700"/>

          <article className='flex align-center justify-between'>
            { renderParticipants(matchParticipants) }
          </article>

          <footer>
          </footer>
        </Modal>

        <TournamentHeader
          tournament={{
            name: tournament.attributes.name,
            type: tournament.attributes.tournamentType,
            state: tournament.attributes.state
          }}
          matchesCount={tournament.relationships.matches.data.length}
          participantsCount={tournament.relationships.participants.data.length}
        />
        <hr className="mt-4 mb-8 border-2 border-teal-700"/>

        <MatchCollection
          matches={ matches }
          participants={ participants }
          tournamentUrl={ tournamentUrl }
        />
      </Layout>
    </>
  )
}

const renderParticipants = (participants) => {
  return (
    participants.map((participant, index) => {
      return (
        <div className='flex items-center justify-center mx-auto text-center flex-col' key={ index }>
          <img
            alt={ participant.attributes.username }
            src={ participant.attributes.imageUrl || defaultAvatarUrl }
            title={ participant.attributes.username }
            className='h-20 w-20 mb-4 rounded-full border-2 border-solid border-orange-500'
          />
          <p className='text-sm'>
            { participant.attributes.username }
          </p>
        </div>
      )
    })
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session: session,
      matchId: context.params.matchId,
      tournamentUrl: context.params.url
    }
  }
}

const defaultAvatarUrl = 'https://secure.gravatar.com/avatar/336089e9bb37e6919b57bcd7825fbbc5?r=r&s=64&d=https://s3.amazonaws.com/challonge_app/misc/challonge_fireball_gray.png'
export default Match
