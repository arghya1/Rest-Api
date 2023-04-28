// Including dotenv to use .env file
require('dotenv').config()

// Including express library
const express = require('express')
// App variable to control our server
const app = express()
// Include mongoose to start using our database
const mongoose = require('mongoose')

// Connect to our database users that holds user information on 0.0.0.0
mongoose.connect(process.env.DATABASE_URL)
// create db 
const db = mongoose.connection
// Error handling when db server is on
db.on('error', (error) => console.error(error))
// Conecting to database
db.once('open', () => console.log('Connected to database.'))

// Setup server to accept JSON 
// use() allow us to use any middleware we want (request -> middleware -> routes)
app.use(express.json())

// Set up our routes to route all user information (routes are inside a folder inside our application)
const userRouter = require('./routes/users')
// Using our route in the application
app.use('/users', userRouter)



// Express Server listens on port 3000 and logs in console
app.listen(3000, () => console.log('Server started.'))
