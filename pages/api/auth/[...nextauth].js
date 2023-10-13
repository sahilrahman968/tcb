import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                try {
                    let res = await fetch(`${process.env.BASE_URL}/api/user/getUser?userid=${user.id}`)
                    res = await res.json();
                    if (res.user === null) {
                        const { id: userid, name, email, image } = user
                        let res = await fetch(`${process.env.BASE_URL}/api/user/addUser`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                userid,
                                name,
                                email,
                                image
                            })
                        })
                        res = await res.json();
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            return user;
        }
    }
}


const handler = NextAuth(authOptions);

export default handler
// export {handler as GET, handler as POST}