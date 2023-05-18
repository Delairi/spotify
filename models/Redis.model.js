import { SchemaFieldTypes } from 'redis';
import { createClient } from "redis";


export const client = createClient({
    url:process.env.NODE_ENV == 'production' ? process.env.REDIS_URL:'redis://localhost:6379'
});



export const ModelTokenSpotify = async () => {

    await client.ft.create('idx:TokensSpotify', {
        '$.access_token': {
            type:SchemaFieldTypes.TEXT,
            AS: 'access_token'
        },
        '$.token_type': {
            type:SchemaFieldTypes.TEXT,
            AS: 'token_type'
        },
        '$.expires_in': {
            type:SchemaFieldTypes.NUMERIC,
            AS: 'expires_in'
        },
        '$.uid': {
            type:SchemaFieldTypes.TEXT,
            AS: 'uid',
        },
        '$.expirationTime':{
            type:SchemaFieldTypes.TEXT,
            as:'expirationTime',
        }
    }, {
        ON: 'JSON',
        PREFIX: ['TokenSpotify:']
    }
    )

}



export const ModelSpotifyQuery = async () => {

    await client.ft.create('idx:SpotifyQueries',{
        '$.search':{
            type:SchemaFieldTypes.TEXT,
            as:'search'
        },  
        '$.q':{
            type:SchemaFieldTypes.TEXT,
            as:'q'
        }
    },{
        ON:'JSON',
        PREFIX:['SpotifyQuery:']
    })

}
