const endpoint = 'https://api.labs.challonge.online/v2/me.json'

export default async (req, res) => {
  const sync = await fetch(endpoint, {
    method: 'GET',
    headers: { 
      'Authorization-Type': 'v2',
      'Authorization': req.headers['authorization'],
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/json'
    }
  })
  const json = await sync.json()
  res.json(json)
}
