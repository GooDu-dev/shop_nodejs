const product_service = require('../services/product.service');
const { ErrorResponse } = require('../utils/ApiError');


// get all product in dartabase
const getAllProduct = async (req, res, next) => {
    try{
        const data = await product_service.getAll()
        if(!data){
            next(ErrorResponse.DataNotFound);
        }
        return res.status(200).json(data);
    }
    catch(err){
        next(err)
    }
}

const getOneProduct = async (req, res, next) => {
    const { id } = req.params;
    if(!id){
        next(ErrorResponse.BadRequest);
    }
    try{
        const data = await product_service.getOneProduct(id);
        if(!data){
            next(ErrorResponse.DataNotFound);
        }
        return res.status(200).json(data)
    }
    catch(err){
        next(err)
    }
}


module.exports = { getAllProduct, getOneProduct }