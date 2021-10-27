const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        minlength:6,
        maxlength:40,
        required:true
    },
    email: {
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email address")
        }
    },
    passwordHash: {
        type:String,
        trim:true,
        //match:(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        required:true,
        minlength:6,
        maxlength:100 
    },
    phone: {
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid phone number")
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: ''
    },

    city: {
        type: String,
        default: ''
    },
    gender:{
        type:String,
        trim:true,
        enum:["male", "female"]
    },
    age:{
        type:Number,
        min:21
    }

});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
