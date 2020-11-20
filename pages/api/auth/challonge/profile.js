const challongeEndpoint = 'https://api.labs.challonge.online/v2/me.json'
const bettingEndpoint = 'http://localhost:3000/users/sign_in.json'

export default async (req, res) => {
  const challongeSync = await fetch(challongeEndpoint, {
    method: 'GET',
    headers: { 
      'Authorization-Type': 'v2',
      'Authorization': req.headers['authorization'],
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/json'
    }
  })
  const challongeJSON = await challongeSync.json()

  const bettingSync = await fetch(bettingEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({user: { email: challongeJSON['data']['attributes']['email'], password: 'password' } })
  })

  res.json({...challongeJSON, data: { attributes: { ...challongeJSON['data']['attributes'], challongeAuthorization: req.headers['authorization'], bettingAuthorization: bettingSync.headers.get('authorization') }}})
}
