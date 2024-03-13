const { ApiError, ErrorResponse } = require("../utils/ApiError");

const errorHandler = (error, req, res, next) => {
    if(error instanceof ApiError){
        return res.status(error.getStatus()).json(error.getResponse());
    }
    var err = ErrorResponse.InternalServerError;
    return res.status(err.getStatus()).json(err.getResponse());
}

module.exports = { errorHandler }