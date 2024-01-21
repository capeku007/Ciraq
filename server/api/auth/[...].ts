import {NuxtAuthHandler} from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
export default NuxtAuthHandler({
    secret:useRuntimeConfig().authSecret,

    pages:{
        signIn:"/login",
    },
     
    providers:[ 
        
        //@ts-expect-error
        CredentialsProvider.default({
            name:'credentials',
            credentials:{},
            // async authorize(credentials:{
            //     username:string,
            //     password:string,
            // }) {
            //     //TODO: fect user from database

            //     return {};
            // },

            authorize(credentials: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
        
                const user = {
                  email: 'test@email.com',
                  password: 'pass',
                }
        
                if (
                  credentials?.email === user.email &&
                  credentials?.password === user.password
                ) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
                } else {
                  // eslint-disable-next-line no-console
                  console.error(
                    'Warning: Malicious login attempt registered, bad credentials provided'
                  )
        
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null
        
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
              },
        }),
    ],

    session:{
        strategy:"jwt"
    },

    callbacks:{
        async jwt({token,user,account}){
            if (user){
                token={
                    ...token,
                    ...user
                }
            }

            return token;
        },

        async session({session,token}){
            session.user={
                ...token,
                ...session.user
            }
            return session;
        }
    }
});