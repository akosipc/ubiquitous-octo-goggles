import axios from 'axios'

const API = ({
  url, 
  data = {}, 
  options = {}, 
  method = "GET", 
  onSuccess,
  onError = (error) => { console.error(error) }, 
  onComplete = () => { }}) => {
    if (method === 'GET') {
      axios.get(url, options).then(onSuccess).catch(onError).then(onComplete)
    } else if (method === 'POST') {
      axios.post(url, data).then(onSuccess).catch(onError).then(onComplete)
    } else if (method === 'PUT') {
      axios.put(url, data).then(onSuccess).catch(onError).then(onComplete)
    } else if (method === 'DELETE') {
      axios.delete(url, options).then(onSuccess).catch(onError).then(onComplete)
    }
}


export default API
