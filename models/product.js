const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please enter product name'],
        trim:true,
        maxLength : [100,'Product name cannot exceed 100 characters']
    },
    price: {
        type:Number,
        required:[true, 'Please enter product price'],
        maxLength : [5,'Product name cannot exceed 100 characters'],
        default:0.0
    },
    description: {
        type:String,
        required:[true, 'Please enter product description']
    },
    ratings:{
        type:Number,
        default:0
    },
    imageurl: {
        type:String,
        required:[true, 'Please enter product image url'] 
    },
    category: {
        type:String,
        required:[true, 'Please enter product category'],
        enum : {
            values: [
                'Stocks',
                'Mutual Funds'
            ],
            message: 'Please select correct category for product'
        }
    },
    stock:{
        type:Number,
        require: [true,'Please enter product stock'],
        maxLength:[5,'Product cannot exceed 5 characters'],
        default:0
    },
    user:
    {
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:
    {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product',productSchema);