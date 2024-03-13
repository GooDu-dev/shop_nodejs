require('dotenv').config()

const { query } = require('express')
const { pool } = require('../config/database.config')
const { ErrorResponse, ApiError } = require('../utils/ApiError')

const TABLE_NAME = process.env.DATABASE_USER_NAME

const getAllUser = async () => {
    const query = `
        SELECT id, name, email
        FROM ${TABLE_NAME};
    `
    try{
        const result = await pool.query(query)

        if(result[0].length === 0){
            throw ErrorResponse.DataNotFound
        }

        return result[0]
    }
    catch(err){
        throw ErrorResponse.CannotQueryFromDatabase
    }
}

const getUserById = async (id) => {
    const query = `
        SELECT id, name
        FROM ${TABLE_NAME}
        WHERE id = ?;
    `
    try{
        const result = await pool.query(query, [ id ])
 
        if(result[0].length !== 1){
            return null
        }

        return result[0]
    }
    catch(err){
        throw ErrorResponse.CannotQueryFromDatabase
    }
}

const getUserByEmail = async (email) => {
    const query = `
        SELECT id, name
        FROM ${TABLE_NAME}
        WHERE email = ?;
    `
    try{
        const result = await pool.query(query, [ email ]);
        if(result[0].length !== 1){
            return null
        }
        return result[0]
    }
    catch(err){
        throw ErrorResponse.CannotQueryFromDatabase
    }
}

const loginUserById = async (id, password) => {
    const query = `
        SELECT id, name, email
        FROM ${TABLE_NAME}
        WHERE id = ? AND password = ?
    `
    try{
        const result = await pool.query(query, [id, password])
        if(result[0] !== 1){
            return null
        }
        return result[0]
    }catch(err){
        throw ApiError.CannotQueryFromDatabase
    }
}

const loginUserByEmail = async (email, password) => {
    const query = `
        SELECT id, name, email
        FROM ${TABLE_NAME}
        WHERE email = ? AND password = ?
    `
    try{
        const result = await pool.query(query, [email, password])
        if(result[0] !== 1){
            return null
        }
        return result[0]
    }catch(err){
        throw ApiError.CannotQueryFromDatabase
    }
}

const createUser = async (name, email, password) => {
    const query = `
        INSERT INTO ${TABLE_NAME} (name, email, password)
        VALUES (?, ?, ?);
    `
    try{
        await pool.query(query, [ name, email, password ]);
        return getUserByEmail(email)
    }
    catch(err){
        throw ErrorResponse.CannotQueryFromDatabase
    }
}

module.exports = { getAllUser, getUserById, getUserByEmail, loginUserById, loginUserByEmail, createUser }