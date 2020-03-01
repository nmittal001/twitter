import React from "react";
import { styles } from "./style";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { homeGetTweetApps, homeCreateTweet } from "./Saga";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      tweet: ""
    };
  }
  handleInputChangeUserName(user_name, value) {
    this.setState({ user_name: value });
  }
  handleInputChangeTweet(tweet, value) {
    this.setState({ tweet: value });
  }

  componentDidMount() {
    this.props.dispatch(homeGetTweetApps());
  }
  tweetFunction = () => {
    if (!this.state.tweet == "")
      this.props.dispatch(homeCreateTweet({ description: this.state.tweet }));
    this.setState({ tweet: "" });
  };
  dateTimeFun = dt => {
    var today = new Date(dt);
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      (today.getHours() > 12 ? today.getHours() - 12 : today.getHours()) +
      ":" +
      today.getMinutes() +
      (today.getHours() > 12 ? "PM" : "AM");
    var dateTime = time + " " + date;
    return dateTime;
  };
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#1aa3ff",
          padding: 10
        }}
      >
        {/* <Card
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CardMedia
            style={{
              width: 100,
              height: 100,
              marginTop: 10,
              borderRadius: 20
            }}
            image={`https://pbs.twimg.com/profile_images/1111729635610382336/_65QFl7B_400x400.png`}
          />
          <TextField
            id="outlined-email-input"
            label="User Name"
            variant="outlined"
            value={this.state.user_name}
            style={{
              width: 500,
              height: 70,
              margin: 5,
              alignItems: "center"
              // position: "absolute"
            }}
            onChange={event =>
              this.handleInputChangeUserName("user_name", event.target.value)
            }
          />
        </Card> */}
        <Grid xs={12} sm={12}>
          <Card>
            <CardMedia
              style={{
                width: 1780,
                height: 500,
                marginTop: 10
                // backgroundSize: "contain"
              }}
              image={`https://pbs.twimg.com/profile_banners/783214/1556918042/1500x500`}
            />
            <CardMedia
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                borderRadius: 20,
                position: "absolute"
              }}
              image={`https://pbs.twimg.com/profile_images/1111729635610382336/_65QFl7B_400x400.png`}
            />
          </Card>
        </Grid>
        <Grid>
          <Card
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginTop: 30
            }}
          >
            <TextareaAutosize
              style={{ height: 100, width: 800 }}
              rowsMax={4}
              aria-label="maximum height"
              placeholder="Tweet here"
              autofocus="true"
              value={this.state.tweet}
              onChange={event =>
                this.handleInputChangeTweet("tweet", event.target.value)
              }
            />
            <Button
              variant="contained"
              color="primary"
              style={{ padding: 10, width: 805 }}
              onClick={this.tweetFunction}
            >
              Tweet
            </Button>
          </Card>
        </Grid>
        {this.props.homeApps ? (
          this.props.homeApps.length > 0 ? (
            this.props.homeApps.map((item, index) => (
              <Grid item xs={6} sm={6} key={index}>
                <Card
                  key={item.id}
                  style={{
                    width: 800,
                    height: item.description
                      ? item.description.length > 100
                        ? item.description.length / 2.3
                        : 100
                      : 100,
                    marginTop: 40
                  }}
                >
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        direction: "row",
                        justifyContent: "space-between"
                        // overflowX: "scroll"
                      }}
                    >
                      <Typography
                        // variant="body2"
                        color="textSecondary"
                      >{`${item.user_info.user_name}: `}</Typography>
                      <Typography
                        // variant="body2"
                        color="textSecondary"
                      >{`${this.dateTimeFun(item.created_at)} `}</Typography>
                    </div>
                    <Typography>{item.description}</Typography>
                    <CardMedia
                      style={{
                        width: 280,
                        height: 400,
                        marginTop: 10,
                        backgroundSize: "contain",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      image={item.image}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={6} sm={6} className={classes.errorMessageBlock}>
              <Grid container>
                <span className={classes.errorMessageText}>
                  {`No TWEET Found`}
                </span>
              </Grid>
            </Grid>
          )
        ) : (
          <CircularProgress className={classes.progress} color="secondary" />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state::", state);
  return {
    homeApps: state.home.homeApps
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
