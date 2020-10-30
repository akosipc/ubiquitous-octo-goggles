import { client } from '../../lib/ChallongeOAuth'

const triggerJSO = () => {
}

const ChallongeAuthButton = () => {
  return (
    <a 
      onClick={ () => { triggerJSO() } }
      className="font-bold rounded bg-orange-600 px-4 py-6 text-gray-200 cursor-pointer hover:bg-orange-500 hover:text-gray-300 transition duration-500 ease-in-out">
      Sign-in using your Challonge account
    </a>
  )
}

export default ChallongeAuthButton
