
const user_service = require('../services/user.service')
const { ApiError, ErrorResponse } = require('../utils/ApiError')

const getUserById = async (req, res, next) => {
    try{
        const { id } = req.params
        const user = await user_service.getUserById(id)
        if(user){
            return res.status(200).json(user)
        }
        throw ErrorResponse.DataNotFound
    }
    catch(err){
        if(err instanceof ApiError) next(err)
        next(ErrorResponse.CannotQueryFromDatabase)
    }
}

module.exports = { getUserById }