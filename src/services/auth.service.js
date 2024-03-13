const { body, validationResult } = require('express-validator')
const { ApiError, ErrorResponse } = require('../utils/ApiError')
const { pool } = require('../config/database.config')
const user_service = require('../services/user.service')

const isEmpty = (params) => {
    for(pr in params){
        return isStringEmpty(pr) || isNumberEmpty(pr)
    }
}

const isStringEmpty = (param) => {
    if(param === undefined){
        return false
    }
    if(type(param) !== String){
        return false
    }
    if(param == ''){
        return false;
    }
    return true;
}

const isNumberEmpty = (param) => {
    if(param === undefined){
        return false
    }
    if(type(param) !== Number){
        return false
    }
    if(param === 0){
        return false;
    }
    return true;
}

const isEmailUsed = async (email) => {
    try{
        const user = await user_service.getUserByEmail(email);
        if(user){
            return true
        }
        return false
    }
    catch(err){
        if(err instanceof ApiError) throw err
        throw ErrorResponse.InternalServerError 
    }
}

const isUserValid = async (email, password) => {
    try{
        const user = await user_service.loginUserByEmail(email, password);
        if(user){
            return true
        }
        return null
    }catch(err){
        if(err instanceof ApiError) throw err
        throw ErrorResponse.InternalServerError
    }
}

module.exports = { isEmpty, isEmailUsed, isUserValid }