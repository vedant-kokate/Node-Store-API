const Products = require("../models/product")

const getAllProductsStatic = async (req,res)=>{
   const product = await Products.find({})
    res.status(200).json({msg:product})
}

const getAllProducts = async (req,res)=>{
    res.status(200).json({msg:'products route'})
}

module.exports={
    getAllProducts,
getAllProductsStatic}