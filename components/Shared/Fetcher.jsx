// we should include a loading function here

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const Fetcher = () => {
  const [url, setUrl] = useState(null)
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = ({ url }) => {
    setUrl(url.split('/')[3])
  }

  useEffect(() => {
    if (url !== null) {
      window.location.replace(`/tournaments/${url}`)
    }
  }, [url])

  return (
    <form className="m-16 flex align-center justify-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-1/4">
        <input
          ref={
            register({
              required: "Required",
              pattern: { 
                value: /(challonge.com)|(challonge.online)/,
                message: "Invalid Challonge URL"
              }
            })
          }
          name="url"
          type="url"
          autoFocus={ true }
          className="w-full px-4 py-2 rounded-lg text-gray-700 text-center"
          placeholder="Challonge Tournament URL"
        />
        <p className='text-sm text-red-500'>
          { errors.url && errors.url.message }
        </p>
      </div>
    </form>
  )
}

export default Fetcher
