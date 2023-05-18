import axios from "axios"
import { client } from "../models/Redis.model.js"

const RedisService = () => {

    return {
        GetToken: async (uid) => {

            try {
                const response = await axios.post('https://accounts.spotify.com/api/token',
                    new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: process.env.CLIENT_ID_SPOTIFY,
                        client_secret: process.env.CLIENT_SECRET_SPOTIFY
                    })
                )
                const expirationTime = Date.now() + (response.data.expires_in * 1000);

                const data = {
                    ...response.data,
                    expirationTime,
                    uid: uid
                }
                await client.json.set(`TokenSpotify:${uid}`, '$', {
                    ...response.data,
                    expirationTime,
                    uid: uid
                })

                return data
            } catch (err) {
                return err
            }


        },
        SaveQuery: async (q, search) => {

            try {

                await client.json.set(`SpotifyQuery:${search}`, '$', {
                    q: JSON.stringify(q),
                    search
                })
                return true

            } catch (err) {
                return false
            }


        },
        ExistQuery: async (search) => {

            try {

                const exist = await client.json.get(`SpotifyQuery:${search}`)
                
                if (exist) return true
                return false

            } catch (err) {
                return false
            }

        },
        Search: async (uid,idx) => {


            const search = await client.json.get(`${idx}:${uid}`)
            if (search) {
                return search
            } else {
                return 'No results'
            }

        }
    }

}

export default RedisService;