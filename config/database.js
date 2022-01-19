const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const connectDatabase  = () =>
{
    mongoose.connect("mongodb+srv://satyamnaidu:satyamnaidu@cluster0.dcljf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false}).then(con=> { 
    console.log('MongoDB database connected');
    })
}

module.exports  = connectDatabase