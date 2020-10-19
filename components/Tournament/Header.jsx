import { capitalize } from 'lodash'

const TournamentHeader = ({ tournament, matchesCount, participantsCount }) => {
  return (
    <>
      <h1 className='text-2xl font-bold'> 
        { tournament.name } 
      </h1>

      <div className='flex text-purple-700 items-star7 text-sm'>
        <span className='mr-4'>
          { capitalize(tournament.type) }
        </span>

        <span className='mx-4'>
          { `Tournament is currently ${tournament.state}` }
        </span>

        <span className='mx-4'>
          { `${matchesCount} Matches` } 
        </span>

        <span className='mx-4'>
          { `${participantsCount} Participants` }
        </span>
      </div>
    </>
  )
}

export default TournamentHeader
