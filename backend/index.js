import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import routerGeneral from './routes/General.route.js'
import dotenv from 'dotenv'
import { ModelSpotifyQuery, ModelTokenSpotify, client } from './models/Redis.model.js'
import TokenActive from './middleware/TokenActive.js'
import UserToken from './middleware/UserToken.js'
import { initializeApp } from './services/Firebase.js'
import responseTime from 'response-time'
dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url))

const main = async () => {

    client.on('connect', () => { console.log('Redis client connected') })
    await client.connect().catch(err => console.log(err, '??'))
    await ModelTokenSpotify().then(() => console.log('Model Token Spotify created')).catch(err => console.log(err));
    await ModelSpotifyQuery().then(() => console.log('Model Spotify Query created')).catch(err => console.log(err));
    const app = express()
    app.use(responseTime())
    app.use(cors({
        origin: 'http://localhost:5173'
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname + './dist'))


    app.use('/api/v1', UserToken, TokenActive, routerGeneral)

    app.listen(4004, () => {

        console.log('Server is running on port 4004!')
    })


}

main().catch(err => console.log(err))

