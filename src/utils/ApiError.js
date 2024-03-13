class ApiError extends Error {
    constructor(code, message, httpStatus){
        super(message)
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    getStatus(){
        return this.httpStatus;
    }
    getResponse(){
        return {
            'code' : this.code,
            'message' : this.message,
        }
    }

    static getErrorResponse(message){
        return new ApiError('10000', message, 500);
    }
}

const ErrorResponse = {
    InternalServerError: new ApiError('10001', 'internal_server_error', 500),
    DatabaseConnectFailed: new ApiError('10002', 'database_connect_failed', 500),
    CannotQueryFromDatabase: new ApiError('10003', 'cannot_query_from_database', 500),
    AuthenticationFailed: new ApiError('10004', 'failed_to_authentication', 500),
    BadRequest: new ApiError('20001', 'bad_request', 400),
    Unauthorized: new ApiError('20002', 'unauthorized', 401),
    PageNotFound: new ApiError('20003', 'page_not_found', 404),
    DataNotFound: new ApiError('20004', 'data_not_found', 404),
    UserNotFound: new ApiError('20005', 'user_not_found', 404),
    PermissionDenied: new ApiError('20006', 'invalid_permission', 403)
}

module.exports = { ApiError, ErrorResponse };