import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async session({session, token}: {session: any, token: any}) {
            console.log("Running the session callback");
            console.log("Token.sub:", token.sub);
            
            
            session.user.id = token.sub as string;
            return session;
        }
    }        
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

