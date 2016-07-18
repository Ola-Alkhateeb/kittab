var mongoose = require('mongoose');
var crypto = require('crypto');

var PostSchema = new mongoose.Schema({
 post: String,
 title: String,
 code: String,
 base_url: String,
 url: String,
 upvote: Number,
 downvote: Number
});

var createSha = function (url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

PostSchema.pre('save', function (next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = mongoose.model('Post', PostSchema);
