const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {username,password} = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({username}).exec()

    if(!foundUser){
        console.log(foundUser)
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if(!match) return res.status(401).json({ message: 'Unauthorized' })

    const token = jwt.sign(
        {
            "id":foundUser._id
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: 7*86400 }
    )

    // const refreshToken = jwt.sign(
    //     {"username":foundUser.username},
    //     process.env.REFRESH_TOKEN_SECRET,
    //     {expiresIn:'7d'}
    // )
    console.log(token)

    req.session.token = token
    
    // ( 'jwt', accessToken, {
    //     httpOnly: false, //accessible only by web server 
    //     secure: true, //https
    //     sameSite: 'None', //cross-site cookie 
    //     maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    // })

    res.status(200).send({ 
        username:foundUser.username,
        id:foundUser.id,
        name:foundUser.name,
        role:foundUser.role
     })
}

// const refresh = (req, res) => {
//     const cookies = req.cookies

//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })

//             const foundUser = await User.findOne({ username: decoded.username }).exec()

//             if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": foundUser.username,
//                         "role": foundUser.role
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '15m' }
//             )

//             res.json({ accessToken })
//         }
//     )
// }

const logout = (req, res) => {
    try {
        req.session = null;
        console.log(req.session,"from logout")
        return res.status(200).send({ message: "You've been signed out!" });
      } catch (err) {
        this.next(err);
      }

    // const cookies = req.cookies
    // if (!cookies?.jwt) return res.sendStatus(204) //No content
    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    // res.status(200).send({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    // refresh,
    logout
}