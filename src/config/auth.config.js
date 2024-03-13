const { ErrorResponse } = require('../utils/ApiError');

const auth_service = require('../services/auth.service')

// define local login middleware for check is user can login
const local_login = async (email, password, callback) => {
    try{
        const user = auth_service.isUserValid(email, password);
        if(user){
            callback(null, user)
        }
        callback(null, false, 'Invalid email or password')
    }catch(err){
        callback(err)
    }
}

module.exports = { local_login }