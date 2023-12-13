import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { dbUsers } from '@/database'
import type { IUser, RoleUser } from '@/interfaces'



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: '*******' }
      },
      async authorize(credentials) {
        // console.log(credentials)
        // return { name: 'Jose Rangel', email: 'jdrangel@go.co', role: 'admin', id: '123123546' }
        return await dbUsers.checkUserEmailPassword({
          email: credentials!.email,
          password: credentials!.password
        })
      }
    })
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log({ token, user, account })
      if (account) {
        token.accessToken = account.access_token

        switch (account.type) {

          case 'oauth':
            //TODO: verificar si existe en mi base de datos
            break;

          case 'credentials':
            token.user = user
            break;

          default:
            break;
        }
      }
      return token
    },

    async session({ session, token, user }) {
      // console.log({ token, user, session })
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    }
  }
}
export default NextAuth(authOptions)