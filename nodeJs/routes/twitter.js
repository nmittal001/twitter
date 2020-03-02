let failJson = { success: 0, message: "There was an error!" };
var userModule = require("../modules/user.module");
var twitterModule = require("../modules/twitter.module");
module.exports = {
  configure(app) {
    app.get("/twitter/getUser", function(req, res) {
      try {
        userModule.getUsers(req.query, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.post("/twitter/register", function(req, res) {
      try {
        userModule.addUser(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.get("/twitter/getTweet", function(req, res) {
      try {
        console.log("req.url:", req.url);
        req.body.user_id = req.decoded.user_id;
        twitterModule.getTweet(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.post("/twitter/addTweet", function(req, res) {
      try {
        req.body.user_id = req.decoded.user_id;
        twitterModule.addTweet(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.post("/twitter/addFollow", function(req, res) {
      try {
        req.body.user_id = req.decoded.user_id;
        userModule.addFollow(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.get("/twitter/getUserSearch", function(req, res) {
      try {
        userModule.getUserSearch(req.query, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.get("/twitter/getHashTagSearch", function(req, res) {
      try {
        twitterModule.getHashTagSearch(req.query.hashtag, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
  }
};
