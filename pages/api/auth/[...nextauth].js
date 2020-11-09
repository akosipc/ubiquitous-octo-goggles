import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    {
      id: 'challonge',
      name: 'Challonge',
      type: 'oauth',
      version: '2.0',
      scopes: ['me'],
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://labs.challonge.online/oauth/token',
      authorizationUrl: 'https://labs.challonge.online/oauth/authorize?response_type=code',
      clientId: 'e9a1dce3df04b51fe9f59cad49f3a33a616cb110b10e934949bd9e716b131dcb',
      clientSecret: '0e47a74543633f6233b9a87935fe79277e49c6585a271b1d6234dc8919f5d0a5',
      profileUrl: 'http://localhost:3000/api/auth/challonge/profile',
      profile: (profile) => {
        return {
          id: profile.data.attributes.uid,
          email: profile.data.attributes.email,
          username: profile.data.id
        }
      }
    }
  ],
  session: {
    jwt: true
  }
}

export default (req, res) => { NextAuth(req, res, options) }
