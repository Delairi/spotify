import axios from 'axios';
import RedisService from '../services/Redis.js';
const GeneralController = () => {

    return {
        Search: async (req, res) => {
            try {

                const query = req.query
                const exist_query = await RedisService().ExistQuery(query.q)
                if (!exist_query) {
                    const token = await RedisService().Search(query.uid, 'TokenSpotify')
                    const response = await axios.get(`https://api.spotify.com/v1/search`, {
                        params: {
                            q: query.q,
                            type: "track",
                            offset: "1",
                            limit: "20"
                        },
                        headers: {
                            'Authorization': `Bearer ${token.access_token}`
                        }
                    })
                    await RedisService().SaveQuery(response.data, query.q)
                    return response.data
                } else {
                    const searching = await RedisService().Search(query.q, 'SpotifyQuery')
                    return searching.q
                }


            } catch (err) {
                return err.message
            }
        }
    }

}

export default GeneralController;