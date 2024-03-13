const mysql = require('mysql2/promise');
const { ErrorResponse } = require('../utils/ApiError');

require('dotenv').config()

try{
    var pool = mysql.createPool({
        host : process.env.DATABASE_HOST,
        user : process.env.DATABASE_USERNAME,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME,
        connectionLimit : 15,
    });
}catch(err){
    error = ErrorResponse.DatabaseConnectFailed;
    throw error;
}

module.exports = { pool }