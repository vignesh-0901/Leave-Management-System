const jwt = require('jsonwebtoken')

const verifyJWT = (req, res) => {
    // const authHeader = req.headers.authorization || req.headers.authorization

    // if(!authHeader?.startsWith('Bearer ')){
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

    // const token = authHeader.split(' ')[1]

    const token = req.cookies.token
    
    if(!token) return res.json({status:false})
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            // if(err) return res.status(403).json({message:'Forbidden'})
            const foundUser = User.findById(decoded.id).exec()
            res.json({status:true, username:foundUser.username, name:foundUser.name, role:foundUser.role})
            // req.user = decoded.UserInfo.username
            // req.role = decoded.UserInfo.role
            // next()
        }
    )
}

module.exports = verifyJWT