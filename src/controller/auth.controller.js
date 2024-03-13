require('dotenv').config()

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ErrorResponse, ApiError } = require('../utils/ApiError');
const auth_service = require('../services/auth.service'); 
const user_service = require('../services/user.service');

const signup = async (req, res, next) => {
    const validation_result = validationResult(req)
    if(validation_result.isEmpty()){
        const { name, email, password1, password2 } = req.body;
        if(password1 != password2){
            next(ErrorResponse.BadRequest);
        }
        try{
            const hash_password = await bcrypt.hash(password1, Number(process.env.HASH_SALT))
            await user_service.createUser(name, email, hash_password);
            return res.status(201).json({'message' : 'user created'})
        }
        catch(err){
            if(err instanceof ApiError) next(err)
            next(ErrorResponse.InternalServerError)
        }
    }
    else{
        next(ErrorResponse.BadRequest)
    }
}

const login = (req, res, next) => {
    try{
        passport.authenticate('local-login', (err, user, info) => {
            if(err){
                if(err instanceof ApiError) next(err)
                return next(ErrorResponse.AuthenticationFailed)
            }
            else if(!user){
                return next(ErrorResponse.UserNotFound)
            }
            req.logIn(user, err => {
                if(err){
                    next(ErrorResponse.Unauthorized)
                }
                return res.status(200).json({"message": "logged in"}) 
            })
        })(req, res, next)
    }
    catch(err){
        if(err instanceof ApiError) next(err)
        next(ErrorResponse.InternalServerError)
    }
}

module.exports = { signup, login }