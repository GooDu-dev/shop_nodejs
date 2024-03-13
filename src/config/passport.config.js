const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { local_login } = require('./auth.config');
const { ErrorResponse } = require('../utils/ApiError');
const user_service = require('../services/user.service')

// define local strategy for login by given email and password
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, local_login))

passport.serializeUser((user, callback) => {
    callback(null, user[0].id)
})
passport.deserializeUser( async (id, callback) => {
    try{
        const user = await user_service.getUserById(id)
        if(user){
            // callback user back
            return callback(null, user[0])
        }
        // callback error because user_not_found
        return callback(null, false, {message : 'user_not_found'})
    }
    catch(err){
        callback(err)
    }
})

module.exports = passport