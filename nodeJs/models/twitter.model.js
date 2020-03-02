var db = require("../lib/db.js");
var constants = require("../config/constants");
var twitterModel = {
  getTweet: function(following_user_ids) {
    var query =
      "SELECT * FROM " +
      constants.TABLES.TWEET +
      " WHERE status = 1 AND user_id IN " +
      this.inQueryParamGen(following_user_ids) +
      " ALLOW FILTERING";
    return db.queryPromise(query, [], { prepare: true });
  },
  addTweet: function(body) {
    var query =
      "INSERT INTO " +
      constants.TABLES.TWEET +
      " ( id , created_at , description , hashtag , image , status , updated_at , user_id , user_info ) VALUES ( now(), dateof(now()), ?, {'" +
      body.hashtag +
      "'}, ?, 1, dateof(now()), ?, ?);";
    return db.queryPromise(
      query,
      [body.description, body.image, body.user_id, body.user_info],
      { prepare: true }
    );
  },
  inQueryParamGen: function(arr) {
    let str = "(";
    count = arr.length;
    arr.map(function(item) {
      str += item;

      if (count > 1) {
        count--;
        str += ",";
      }
    });
    str += ")";
    return str;
  },
  getHashTagSearch: function(hashtag, callback) {
    var query =
      "SELECT * FROM " +
      constants.TABLES.TWEET +
      " WHERE status = 1 AND hashtag CONTAINS '" +
      hashtag +
      "' ALLOW FILTERING";
    return db.queryPromise(query, [], { prepare: true }, callback);
  }
};
module.exports = twitterModel;
