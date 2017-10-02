var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var express=require('express');
var app=express();
var userSchema = mongoose.Schema({
    local: {
        username:String,
        lastname:String,         
        email:String,
        address1:String,
        address2:String,
        countries:String,
        check:String,
        states:String,
        city:String,
        nonprofit:String,
        title:String,
        zipcode:String,
        organization:String,
        nameoforganisation:String,
        password:String,
        confirmpassword:String,
        url1:String,
        url2:String
        
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});
userSchema.methods.generateHash = function(password){
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
    return bcryptjs.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User',userSchema);



    
