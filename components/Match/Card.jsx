const defaultAvatarUrl = 'https://secure.gravatar.com/avatar/336089e9bb37e6919b57bcd7825fbbc5?r=r&s=64&d=https://s3.amazonaws.com/challonge_app/misc/challonge_fireball_gray.png'


const MatchCard = ({identifier, state, participants}) => {
  return (
    <div className='flex items-center bg-white rounded-lg p-6 shadow transition-shadow duration-500 ease-in-out hover:shadow-2xl'>
      <p className='font-bold text-gray-500 mr-4'>
        { identifier }
      </p>

      {
        participants.map((participant, index) => {
          return (
            <img 
              alt={ participant.attributes.username } 
              key={ index }
              src={ participant.attributes.imageUrl || defaultAvatarUrl } 
              title={ participant.attributes.username }
              className='h-10 w-10 rounded-full' 
            />
          )
        })
      }
    </div>
  )
}

export default MatchCard
