import jwt from "jsonwebtoken"
 const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, "test")
            req.user = decodedData

            // jwt.verify(token, "test", (err, decoded) => {
            //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            //     req.userId = decoded?.id
            // })

        } else {
            decodedData = jwt.decode(token)
            req.user = decodedData

            // decodedData = jwt.decode(token, (err, decoded) => {
            //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            //     req.userId = decoded?.sub
            // })

        }

        next()
    } catch(error) {
        console.log(error)
    }
 }

 export default auth