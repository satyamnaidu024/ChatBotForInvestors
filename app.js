var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env'});
var mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const connectDatabase = require('./config/database');

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

// app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
// app.use(cors());

var PORT = process.env.PORT || 5000;

//mongoose.connect("mongodb://localhost/chatbotDB");
//mongoose.connect("mongodb+srv://satyamnaidu:satyamnaidu@cluster0.dcljf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

connectDatabase();


var {Schema} = mongoose;
var contactInfoSchema = new Schema({
    name: String,
    email:String
});

var contact = mongoose.model('contact',contactInfoSchema);
app.get('/',function(req,res){
    res.send("test");
})

//adding the dialogflow routes to a separate file in the folder named routes
require('./routes/dialogFlowRoutes')(app);

//adding routes for products like stock and mutual funds
const products =require('./routes/product');
const faq =require('./routes/faq');
const auth =require('./routes/auth');
const order =require('./routes/order');

app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',faq);
app.use('/api/v1',order);


app.listen(PORT,function(){
    console.log("Chatbot for Investors Server has Started");
});

module.exports = app