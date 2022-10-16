require('dotenv').config()
const connectDB = require('./db/connect')
const products = require('./models/product')

const JsonProducts = require('./products.json')

const start = async ()=>{
   try {
   await connectDB(process.env.MONGO_URI)
   //  console.log('connected');
    await products.deleteMany();
   //  console.log('deleted all');
    await products.create(JsonProducts);
    console.log('sucess');
    process.exit(0)
   } catch (error) {
    console.log(error);
    process.exit(1)
   } 
}
start()