const Product = require("../models/product")

const getAllProductsStatic = async (req,res)=>{
    
   const product = await Product.find({}).sort('name')
    res.status(200).json({msg:product,nbhits:product.length})
}

const getAllProducts = async (req,res)=>{
    const {featured, company,name, sort} = req.query
    const queryObj = {}
    if (featured){
        queryObj.featured = featured==='true'?true:false
    }
    if (company){
        queryObj.company = company
    }
    if (name){
        queryObj.name = {$regex:name  ,$options:'i'}
    }
    console.log(queryObj);
    let result = Product.find(queryObj)
    if (sort){
        let sortList = sort.replace(","," ")
        console.log(sortList)
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }
    const products = await result


    res.status(200).json({msg:products,nbhits:products.length})
}

module.exports={
    getAllProducts,
getAllProductsStatic}