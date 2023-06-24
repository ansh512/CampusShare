const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    images:{
        type:[String]
    },
    status:{
        type:[String]
    }
});

module.exports = mongoose.model('Item', itemSchema);
