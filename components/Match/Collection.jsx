import Link from 'next/link'
import { filter, includes } from 'lodash'

import MatchCard from '../../components/Match/Card'


const MatchCollection = ({ tournamentUrl, matches, participants }) => {
  if (matches.length === 0) return <BlankSlate/>

  const keys = Object.keys(matches)

  return (
    keys.map(key => {
      return (
        <section key={ key }>
          <h2 className='font-bold'>
            { `Round ${key}` }
          </h2>

          <div className='grid grid-cols-4 gap-4 my-2 mb-4'>
            {
              matches[key].map((match, index) => {
                return (
                  <Link
                    as={ `/tournaments/${tournamentUrl}/matches/${match.id}` }
                    key={ index }
                    href="/tournaments/[url]/matches/[matchId]"
                  >
                    <a>
                      <MatchCard 
                        key={ index }
                        state={ match.attributes.state }
                        identifier={ match.attributes.identifier }
                        participants={
                          selectMatchParticipants(participants, [match.relationships.player1.data.id, match.relationships.player2.data.id])
                        }
                      />
                    </a>
                  </Link>
                )
              })
            }
          </div>

        </section>
      )
    })
  )
}

const selectMatchParticipants = (collection = [], identifiers) => { 
  return filter(collection, (participant) => {
    return identifiers.includes(participant.id)
  })
}

export default MatchCollection
