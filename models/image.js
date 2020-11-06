var mongoose = require('mongoose');

const crypto = require('crypto')

const uuuidv1 = require('uuid/v1')

const {ObjectId} = mongoose.Schema;

  var Schema = mongoose.Schema;

  var imageSchema = new Schema({
    image:[] },{timestamps:true})
    
module.exports = mongoose.model("Image",userSchema);