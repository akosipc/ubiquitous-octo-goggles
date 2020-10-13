import Link from 'next/link'

import { capitalize } from 'lodash'

const DashboardCard = ({ name, type, participantCount, startsAt }) => {
  return (
    <div className='flex items-center justify-between bg-white rounded-lg p-6 shadow transition-shadow duration-500 ease-in-out hover:shadow-2xl'>
      <img className='h-16 w-16 rounded-full' src='https://www.placecage.com/c/200/200'/>

      <div className='text-left w-3/4'>
        <h2 className='text-lg truncate'> { name } </h2>

        <div className='text-purple-500'> { capitalize(type) } </div>

        <div className='text-gray-600'>
          { participantCount } 
          &nbsp;
          Participants
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
