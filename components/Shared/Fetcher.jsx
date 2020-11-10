// we should include a loading function here

import { useForm } from 'react-hook-form'

const Fetcher = () => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = values => {
    console.log(values)
  }

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
