import admin from "firebase-admin";
function UserToken(req, res, next) {

    const auth = admin.auth()
    const authorization = req.headers.authorization
    if(authorization == undefined) return res.status(401).json({ message: 'Unauthorized' })
    const token = authorization.split(' ')[1]
    auth.verifyIdToken(token).then((decodedToken) => {
        next()
    }).catch((err) => {
        res.status(401).json({ message: 'Unauthorized' })
    })

}

export default UserToken