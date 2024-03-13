const { query } = require('express');
const { pool } = require('../config/database.config');
const { ErrorResponse, ApiError } = require('../utils/ApiError');

const TABLE_NAME = 'products'

const getAll = async () => {
    const query = `
        SELECT id, name, description, likes, price
        FROM ${TABLE_NAME}
    `
    try{
        const result = await pool.query(query);
        
        if(result.length === 0) {
            throw ErrorResponse.DataNotFound
        }

        return result[0];
    }
    catch(err){
        if(err instanceof ApiError) throw err
        throw ErrorResponse.CannotQueryFromDatabase;
    }
}

const getOneProduct = async (id) => {
    const query = `
        SELECT id, name, description, likes, price
        FROM ${TABLE_NAME}
        WHERE id = ?
    `;
    try{
        const result = await pool.query(query, [ id ]);
        if(result[0].length !== 1){
            throw ErrorResponse.DataNotFound
        }
        return result[0]
    }
    catch(err){
        if(err instanceof ApiError) throw err
        throw ErrorResponse.CannotQueryFromDatabase;
    }
}

module.exports = { getAll, getOneProduct }