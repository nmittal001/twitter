var db = require("../lib/db.js");
var constants = require("../config/constants");
var utils = require("../lib/utils.js");

var userModel = {
  getUsers: function(body) {
    body.status = 1;
    let data = utils.getQueryGenerator(body);
    var query = "SELECT * FROM " + constants.TABLES.USER_DETAILS + data.qry;
    return db.queryPromise(query, data.params, data.options);
  },
  addUser: function(body) {
    var query =
      "INSERT INTO " +
      constants.TABLES.USER_DETAILS +
      " (user_id, email, gender, image, user_name, created_at, status, updated_at, mobile_no, password) VALUES ( now(),?,?,?,?, dateof(now()), 1, dateof(now()) ,?, ? )";
    return db.queryPromise(
      query,
      [
        body.email,
        body.gender,
        body.image,
        body.user_name,
        body.mobile_no,
        body.password
      ],
      { prepare: true }
    );
  },
  addFollowing: function(body) {
    var query =
      "UPDATE user SET following_user_ids = following_user_ids+ {" +
      body.follow_user_ids +
      "} WHERE user_id =" +
      body.user_id;
    return db.queryPromise(query, [], { prepare: true });
  },
  addFollowed: function(body) {
    var query =
      "UPDATE user SET followed_by_user_ids = followed_by_user_ids + {" +
      body.user_id +
      "} WHERE user_id =" +
      body.follow_user_ids;
    return db.queryPromise(query, [], { prepare: true });
  },
  getUserSearch: function(search, callback) {
    queryAdd = "";
    if (search.user_name) {
      queryAdd = " AND user_name like '" + search.user_name + "%' ";
    }
    var query =
      "SELECT * FROM " +
      constants.TABLES.USER_DETAILS +
      " WHERE status = 1 " +
      queryAdd +
      " ALLOW FILTERING";
    return db.queryPromise(query, [], { prepare: true }, callback);
  }
};
module.exports = userModel;
