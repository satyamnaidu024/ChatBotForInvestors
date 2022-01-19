const Order = require('../models/order');
const Product = require('../models/product');
// const { use } = require('../routes/product');
// const sendToken = require('../utils/jwtToken');

//create a new order => /api/v1/order/new
exports.newOrder = async (req,res,next) => {
    const {orderItems,itemsPrice,totalPrice,paymentInfo} = req.body;
    const order = await Order.create({
        orderItems,
        itemsPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
    })

   res.status(200).json({
       success:true,
       order
   })
}


//get single order => api/v1/order/:id

exports.getSingleOrder = async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(!order){
        res.status(404).json({
            success:false,
            message:'No order found with this id'
        })  
    }
   res.status(200).json({
       success:true,
       order
   })
}

//get logged in user orders => api/v1/order/me

exports.myOrders = async (req,res,next) => {
    const orders = await Order.find({user:req.user.id});
   res.status(200).json({
       success:true,
       orders
   })
}