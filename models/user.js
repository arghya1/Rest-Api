// We will require mongoose to build the model so lets include it/import it
const mongoose = require('mongoose')

// Creating our schema for the db
const userSchema = new mongoose.Schema({
    // This schema takes an JS object
    // This JS object will have keys for all properties of our user
    // Set up properties for our schema in each key body
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Export the schema into the app
// Using model function to easily interact with the database 
module.exports = mongoose.model('user', userSchema)

