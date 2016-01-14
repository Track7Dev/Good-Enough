var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connect(***REMOVED***);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log('Connected to MongoDB');
});

var usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  city: String,
  interests: [String],
  type: String,
  personality: String,
  picture: String,
  places: [String],
  conversations: [String],
  meet: [String]
});

var messagesSchema = new Schema({
  messages: []
});

var Users = mongoose.model('User', usersSchema);
var Messages = mongoose.model('Message', messagesSchema);

module.exports.Users = Users;
module.exports.Messages = Messages;
module.exports.db = db;