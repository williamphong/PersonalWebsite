import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import fetch from "node-fetch";

const scopes = [
    "user-read-email",
    "user-library-read",
].join(",")

const params = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope: scopes,
    redirect_uri: 'http://localhost:3000/api/auth/callback/spotify',
    //state: 'your_state_here'
}

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

// @ts-expect-error token any type
async function refreshAccessToken(token) {
    const params = new URLSearchParams()
    params.append("grant_type", "refresh_token")
    params.append("refresh_token", token.refreshToken)
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            // @ts-expect-error new buffer has any type
            'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
        },
        body: params
    })
    const data = await response.json()
    return {
        ...token,
        // @ts-expect-error data type unknown
        accessToken: data.access_token,
        // @ts-expect-error data type unknown
        refreshToken: data.refresh_token ?? token.refreshToken,
        // @ts-expect-error data type unknown
        accessTokenExpires: Date.now() + data.expires_in * 1000
    }
}

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_SECRET as string,
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.accessTokenExpires = account.expires_at
                return token
            }
            // access token has not expired
            // @ts-expect-error The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires * 1000) {
                return token
            }

            // access token has expired
            return await refreshAccessToken(token)
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            // @ts-expect-error accessToken doesnt exist on session
            session.accessToken = token.accessToken
            return session
        }
    }

}