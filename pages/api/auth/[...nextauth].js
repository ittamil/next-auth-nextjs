import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    session: { jwt: true },

    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {


                const body = JSON.stringify({
                    access_token: account.id_token,
                });

                try {
                    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: body
                    });
                    const data = await apiRes.json();
                    token.access_token = data?.access
                    token.refresh_token = data?.refresh

                } catch (error) {

                }
            }
            return token
        },
        async session(session, token, user) {
            return session
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});