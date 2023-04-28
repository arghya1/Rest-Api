// Our entire application is using express, so importing it
const express = require('express')
// Create our router variable using the Router functionality of express
const router = express.Router()
// Importing the custom-made user module
const User = require('../models/user')


// Creating RESTful endpoints of our routes 
// to perform CRUD operations on the database = Configure CRUD routes

// Getting all - Read
router.get('/', async (req, res) => {
    try {
        // Find all users using async await
        const users = await User.find()
        // When no error / successful show this
        res.json(users)

    } catch (err) {
        // Server problem status code 500 to be shown to user
        res.status(500).json({message: err.message})
    }
})

// id parameter to perform basic CRUD operations execept for creation
// Creation uses a general route

// Getting one - Read after id param in get, setup the getUser middleware just by name invoking it
router.get('/:id', getUser, (req, res) => {
    // Sending response from the route based on a request parameter // json
    res.json(res.user)
})


// Creating one - Create 
router.post('/', async (req, res) => {
    const user = new User({
        // Takes a JS object
        name: req.body.name,
        age: req.body.age
    })
    try {
        // Save new user to database
        const newUser = await user.save()
        // Show message on success - 201 - Successfully created
        res.status(201).json(newUser)
    } catch (err) {
        // Show message on fail - 400 - User gives bad data
        res.status(400).json({ message: err.message })

    }

})

// Updating one - Update
router.patch('/:id', getUser, async (req, res) => {
    // Set new name
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.age != null) {
        res.user.age = req.body.age
    }
    // Now update the database
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)

    } catch (err) {
        res.status(400).json({ message: err.message})

    }

})
// Deleting one - Delete
router.delete('/:id', getUser, async (req, res) => {
    try {
        // remove user
        const removedUser = await res.user.deleteOne()
        // Show on success
        res.json({ message: 'Deleted one user'})

    } catch (err) {
        // Error while removing user - 500 server error
        res.status(500).json({ message: err.message })

    }

})

// Since the get(read one), update and delete uses an id 
// We will not rewrite the same code in three separate functions
// Rather we will use a middleware for the sake of modular coding

// Middleware function for get, update, delete - Similar structure (req, res) => {}
// asynchronous as we will be accessing a database using this code

async function getUser(req, res, next) {
    // next sends the execution the next callback. i.e the given function, patch, delete, get etc.
    let user // Setting subscriber to undefined
    try {
        // Get the user
        user = await User.findById(req.params.id)
        // Check if user exists
        if (user == null) {
            // If user is not in database return 404 not found error
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        // Status 500 if execution fails
        return res.status(500).json({ message: err.message})
    }
    // setting response to user to call it through other crud functions in this route app
    res.user = user
    //console.log(user.name)
    // moving on to next piece of middleware or request handler itself
    next()
}

// Export the router module to be used in server.js
module.exports = router