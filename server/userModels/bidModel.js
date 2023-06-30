const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const BidSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    itemID:{
        type:ObjectId,
        required:true
    },
    amount: { 
        type: Number,
        required:true,
    },
    remark: { 
        type: String 
    },
    accepted: { 
        type: String 
    }
});

module.exports = mongoose.model('Bid', BidSchema);
