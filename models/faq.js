const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        type:String,
        required:[true, 'Please enter question for faq'],
    },
    answer: {
        type:String,
        required:[true, 'Please enter answer for faq'],
    },
    category: {
        type:String,
        required:[true, 'Please enter faq category'],
        enum : {
            values: [
                'Stocks',
                'Mutual Funds',
                'All'
            ],
            message: 'Please select correct category for faq'
        }
    }
 
})

module.exports = mongoose.model('Faq',faqSchema);