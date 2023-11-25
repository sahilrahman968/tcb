import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { addUser, searchUsers } from "../../../apiConsumers/user";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                try {
                    let response = await searchUsers({email:user?.email},true);
                    if (response?.length === 0) {
                        const { id: userid, name, email, image } = user
                        let response = await addUser({email,name,image});
                    }
                }
                catch (err) {
                }
            }
            return user;
        }
    }
}


const handler = NextAuth(authOptions);

export default handler
// export {handler as GET, handler as POST}