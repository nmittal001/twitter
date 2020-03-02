var userModel = require("../models/user.model");
var twitterModel = require("../models/twitter.model");
var userModule = require("../modules/user.module");

var twitterModule = {
  getTweet: async function(body, callback) {
    self = this;
    let following_user_ids = [];
    let userInfo = await userModel.getUsers({ user_id: body.user_id });
    let tweetUser = userInfo.rows[0].following_user_ids;
    if (!tweetUser) tweetUser = [];
    tweetUser.push(body.user_id);
    if (tweetUser) {
      twitterModel
        .getTweet(tweetUser)
        .then(function(results) {
          if (results.rows[0]) {
            self.sortPosts(results.rows);
            callback({ success: 1, data: results.rows });
          } else callback({ success: 1, data: [] });
        })
        .catch(function(err) {
          console.log("err:", err);
          callback({ success: 0, message: "unable to fetch tweet data" });
        });
    } else {
      callback({ success: 1, data: [] });
    }
  },
  addTweet: function(body, callback) {
    userModule.userInfo(body.user_id).then(function(userInfo) {
      body.user_info = userInfo;
      twitterModel
        .addTweet(body)
        .then(function(value) {
          if (value) {
            callback({ success: 1, message: "Tweet add successfully" });
          } else {
            callback({ success: 0, message: "Fail to add tweet details" });
          }
        })
        .catch(function(err) {
          console.log(err);
          callback({ success: 1, message: "Fail to add tweet details" });
        });
    });
  },
  sortPosts: function(array) {
    array.sort(function(a, b) {
      var keyA = new Date(a.created_at),
        keyB = new Date(b.created_at);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
  },
  getHashTagSearch: function(searchQuery, callback) {
    twitterModel
      .getHashTagSearch(searchQuery)
      .then(function(results) {
        if (results.rows.length > 0)
          callback({ success: 1, data: results.rows });
        else callback({ success: 1, data: [] });
      })
      .catch(function(err) {
        console.log(err);
        callback({
          success: 0,
          message: "unable to fetch tweet for this hashtag"
        });
      });
  }
};
module.exports = twitterModule;
