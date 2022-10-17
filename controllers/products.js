const Product = require("../models/product")

const getAllProductsStatic = async (req,res)=>{
    
   const product = await Product.find({}).sort('name')
    res.status(200).json({msg:product,nbhits:product.length})
}

const getAllProducts = async (req,res)=>{
    const {featured, company,name, sort,fields, numericFilters} = req.query
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
    if(numericFilters){
        const operationMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operationMap[match]}-`);
        const options = ['price','rating']
        filters.split(",").forEach(element => {
            const [field,operator,value] = element.split("-")
            if (options.includes(field)){
                queryObj[field]={[operator]:Number(value)}
            }
            
        });
    }
    console.log(queryObj);
    let result = Product.find(queryObj)
    if (sort){
        let sortList = sort.replace(","," ")
        
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }
    if (fields){
        const fieldList = fields.replace(","," ")
        console.log(fieldList)
        result = result.select(fieldList )
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;
    result = result.skip(skip).limit(limit);
    const products = await result


    res.status(200).json({msg:products,nbhits:products.length})
}

module.exports={
    getAllProducts,
getAllProductsStatic}