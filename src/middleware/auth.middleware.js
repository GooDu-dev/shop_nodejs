const { body } = require('express-validator');
const auth_service = require('../services/auth.service');
const { ErrorResponse } = require('../utils/ApiError');


const passedIfAuth = (req, res, next) => {
    next()   
}

const registerValidation = [
    body('name', 'Username is empty.').trim().not().isEmpty(),
    body('email', 'Email is empty').isEmail().custom( async email => {
        return await auth_service.isEmailUsed(email).then(is_used => {
            if(is_used){
                return Promise.reject('Invalid email')
            }
            return true
        }).catch(err => {
            throw err
        })
    }),
    body('password1', 'Password must contain at least 6 characters').trim().not().isEmpty().isLength({min : 6}),
    body('password2', 'Confirm password must same as password').trim().not().isEmpty().isLength({min: 6})
]

const isNotLogin = (req, res, next) => {
    if(req.isAuthenticated()){
        // logged in
        let err = ErrorResponse.PermissionDenied
        next(err);
    }
    next()
}

const isLogin = (req, res, next) => {
    if(req.isAuthenticated()){
        // logged in
        next()
    }
    let err = ErrorResponse.PermissionDenied
    next(err)
}

module.exports = { passedIfAuth, registerValidation, isLogin, isNotLogin };