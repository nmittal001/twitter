var express = require("express");
var bodyparser = require("body-parser");
var jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
var app = express();
var twitter = require("./routes/twitter.js");
var db = require("./lib/db.js");
var userModule = require("./modules/user.module");
var cors = require("cors");
let failJson = { success: 0, message: "There was an error!" };

app.use(cors());

app.use(bodyparser.json());
db.configure();

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

app.post("/twitter/login", function(req, res) {
  //	console.log("req", req.url, req.body);
  userModule.getUsers(req.body, function(result) {
    let dbEmail = "";
    let dbPassword = "";
    if (result.data && result.data.length == 1) {
      dbEmail = result.data[0].email;
      dbPassword = result.data[0].password;
    }
    try {
      if (req.body.email && req.body.password) {
        if (req.body.email === dbEmail && req.body.password === dbPassword) {
          jwt.sign(
            { email: req.body.email, user_id: result.data[0].user_id },
            "Hello",
            // { expiresIn: '12h' // expires in 12 hours
            // },
            function(err, token) {
              if (err) {
                return res.status(401).send({
                  success: 0,
                  message: "Failed to generate authenticate token."
                });
              } else {
                res.send({
                  success: 1,
                  message: "Authentication successful!",
                  token: token
                });
              }
            }
          );
        } else {
          res.status(403).send({
            success: 0,
            message: "Incorrect username or password"
          });
        }
      } else {
        res.status(400).json({
          success: 0,
          message: "Authentication failed! Please check the request"
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});
app.use(function(req, res, next) {
  console.log("req.url:", req.url);
  var token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "Hello", function(err, decoded) {
      if (err) {
        return res
          .status(401)
          .send({ success: 0, message: "Failed to authenticate token." });
      } else {
        console.log("decoded", decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: 0,
      message: "token is require"
    });
  }
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000,
  handler: function handler(req, res) {
    res.json({
      success: 0,
      message: "You have cross limit more than 100 times per min"
    });
  }
});

app.use("/twitter/", apiLimiter);

app.get("/", function(req, res) {
  return res.json({ success: 1, message: "twitter API" });
});

twitter.configure(app);

var server = app.listen(7005, function() {
  console.log("Listening on port " + server.address().port);
});
