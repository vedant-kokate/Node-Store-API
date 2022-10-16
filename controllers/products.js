const Product = require("../models/product")

const getAllProductsStatic = async (req,res)=>{
   const product = await Product.find({featured:true})
    res.status(200).json({msg:product})
}

const getAllProducts = async (req,res)=>{
    const products = await Product.find(req.query)
    res.status(200).json({msg:products,nbhits:products.length})
}

module.exports={
    getAllProducts,
getAllProductsStatic}