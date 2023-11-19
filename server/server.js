require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvent } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const verifyJWT = require('./middleware/verifyJWT')
const cookieSession = require("cookie-session");


const PORT = process.env.PORT || 3500

connectDB()

console.log(process.env.NODE_ENV);

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(
    cookieSession({
      name: "Vignesh-Session",
      keys: [process.env.ACCESS_TOKEN_SECRET], // should use as secret environment variable
      httpOnly: true
    })
);

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

// app.post('/verify',verifyJWT)

app.use('/auth', require('./routes/authRoutes'))

app.use('/users', require('./routes/userRoutes'))

app.use('/leave', require('./routes/leaveRoutes'))
// app.use('/leave', [verifyJWT], require('./routes/leaveRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, '/views', '404.html'))
    } else if(req.accepts('json')){
        res.json({message : "404 Not Found"})
    } else res.type('txt').send('404 Not Found')
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

// app.listen(PORT, () => console.log(`server running on the port ${PORT}`))


