const mongoose = require('mongoose');
const PhoneNumber = require('libphonenumber-js');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@tezu\.ac\.in$/.test(v);
      },
      message: props => `${props.value} is not a valid university email address!`
    }
  },
  password: String,
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  resetToken: {
    token: { type: String },
    expiresAt: { type: Date }
  },
  refreshToken: {
    token: { type: String },
    expiresAt: { type: Date }
  },  
  bid: [
    {
      itemID:{type:String},
      amount: { type: Number },
      remark: { type: String },
      accepted: { type: String }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
