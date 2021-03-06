import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    {
      id: 'challonge',
      name: 'Challonge',
      type: 'oauth',
      version: '2.0',
      scope: ['me tournaments:read tournaments:write participants:read matches:read communities:manage'],
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://api.labs.challonge.online/oauth/token',
      authorizationUrl: 'https://api.labs.challonge.online/oauth/authorize?response_type=code',
      clientId: 'e9a1dce3df04b51fe9f59cad49f3a33a616cb110b10e934949bd9e716b131dcb',
      clientSecret: '0e47a74543633f6233b9a87935fe79277e49c6585a271b1d6234dc8919f5d0a5',
      profileUrl: `${process.env.NEXTAUTH_URL}/api/auth/challonge/profile`,
      profile: (profile) => {
        return {
          id: profile.data.attributes.uid,
          email: profile.data.attributes.email,
          image: profile.data.attributes.imageUrl,
          username: profile.data.id
        }
      }
    }
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      user.name = profile['data']['attributes']['uid']
      user.bettingAccessToken = profile['data']['attributes']['bettingAuthorization']
      user.challongeAccessToken = profile['data']['attributes']['challongeAuthorization']

      return Promise.resolve(true)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) { token = { 
        ...token, 
        bettingAccessToken: user.bettingAccessToken,
        challongeAccessToken: user.challongeAccessToken
      } }

      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.bettingAccessToken = user.bettingAccessToken
      session.challongeAccessToken = user.challongeAccessToken

      return Promise.resolve(session)
    }
  },
  session: {
    jwt: true
  },
  jwt: {
    secret: '',
  }
}

export default (req, res) => { NextAuth(req, res, options) }
