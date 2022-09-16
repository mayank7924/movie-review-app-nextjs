import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import User from "../../../models/user"
import createConnection from "../../../src/dbConnection";
import createHash from "../../../src/hash";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: {  label: "Password", type: "password" }
              },
            async authorize(credentials) {
                await createConnection()
                const user = await User.findOne({email: credentials.email})
                if(!user) {
                    throw new Error("User not found")
                }
                const auth = user.password == createHash(process.env.PASSWORD_PREFIX + credentials.password)
                if(!auth) {
                    throw new Error("password is incorrect")
                }
                return {
                    email: credentials.email
                }
            },
            async redirect({ url, baseUrl }) {
                return baseUrl
              }  
        })
    ]
})