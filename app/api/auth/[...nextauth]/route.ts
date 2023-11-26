import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
    session: {
      strategy: 'jwt'
    },
    pages: {
      signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: {},
              password: {}
            },
            async authorize(credentials, request) {
              const response = await sql`SELECT * FROM users WHERE email=${credentials?.email}`
              const user = response.rows[0]
              const passwordCorrect = await compare(credentials?.password || "", user.password)
              if (passwordCorrect) {
                return {
                  id: user.id,
                  email: user.email
                }
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
    ]
})

export { handler as GET, handler as POST }