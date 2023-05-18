import RedisService from "../services/Redis.js"

const TokenActive = async (req, res, next) => {

    const exist_token = await RedisService().Search(req.query.uid, 'TokenSpotify')
    if (exist_token != 'No results') {
        const hasExpired = Date.now() > exist_token.expirationTime;
        if (hasExpired) {
            console.log('expired')
            await RedisService().GetToken(req.query.uid)
            next()
        }else {
            console.log('pass')
            next()
        }
    } else {
        console.log('new')
        await RedisService().GetToken(req.query.uid)
        next()
    }



}

export default TokenActive;