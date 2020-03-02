var userModel = require("../models/user.model");
var userModule = {
  getUsers: function(body, callback) {
    userModel
      .getUsers(body)
      .then(function(results) {
        if (results.rows.length > 0)
          callback({ success: 1, data: results.rows });
        else callback({ success: 1, data: [] });
      })
      .catch(function(err) {
        console.log(err);
        callback({ success: 0, message: "unable to fetch users data" });
      });
  },
  addUser: function(body, callback) {
    getUser = userModel
      .getUsers({ email: body.email, password: body.password })
      .then(function(value) {
        if (value && value.rows.length == 0) {
          userModel
            .addUser(body)
            .then(function(value) {
              if (value) {
                callback({ success: 1, message: "User add successfully" });
              } else {
                callback({ success: 0, message: "Fail to add user details" });
              }
            })
            .catch(function(err) {
              console.log(err);
              callback({ success: 0, message: "Fail to add user details" });
            });
        } else {
          callback({
            success: 0,
            message: "already register with this email id"
          });
        }
      });
  },
  userInfo: function(user_id) {
    return new Promise(function(resolve, reject) {
      userModel.getUsers({ user_id: user_id }).then(function(result) {
        if (result.rows && result.rows.length > 0) {
          let values = {
            user_name: result.rows[0].user_name ? result.rows[0].user_name : "",
            email: result.rows[0].email ? result.rows[0].email : "",
            gender: result.rows[0].gender ? result.rows[0].gender : ""
          };
          resolve(values);
        } else {
          reject("couldnt get user id");
        }
      });
    });
  },
  addFollow: function(body, callback) {
    try {
      Promise.all([
        userModel.addFollowing(body),
        userModel.addFollowed(body)
      ]).then(function(result) {
        if (result) {
          callback({ success: 1, message: "You are following now" });
        } else {
          callback({ success: 1, message: " not following" });
        }
      });
    } catch (err) {
      console.log(err);
      callback({ success: 0, message: "unable to follow users" });
    }
  },
  getUserSearch: function(searchQuery, callback) {
    userModel
      .getUserSearch(searchQuery)
      .then(function(results) {
        if (results.rows.length > 0)
          callback({ success: 1, data: results.rows });
        else callback({ success: 1, data: [] });
      })
      .catch(function(err) {
        console.log(err);
        callback({ success: 0, message: "unable to fetch users data" });
      });
  }
};
module.exports = userModule;
