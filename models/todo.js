//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TodoModelSchema = new Schema({
  title: {
      type: String,
      required: true,
  },
  status: {
      type: Boolean,
      default: false
  },
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Todo', TodoModelSchema );