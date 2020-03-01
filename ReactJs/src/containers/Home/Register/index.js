import React from "react";
// import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { Grid, Icon, CircularProgress } from "@material-ui/core";
import { homeCreateUser } from "../Saga";
// import { styles } from "./style";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: "",
      mobileNo: "",
      password: ""
    };
  }
  handleInputChangeName = (name, data) => {
    this.setState({ name: data });
  };
  handleInputChangeEmail = (email, data) => {
    this.setState({ email: data });
  };
  handleInputChangeGender = (gender, data) => {
    this.setState({ gender: data });
  };
  handleInputChangeMobile = (mobileNo, data) => {
    this.setState({ mobileNo: data });
  };
  handleInputChangePassword = (password, data) => {
    this.setState({ password: data });
  };
  handleCreateUser = () => {
    // this.props.dispatch(
    //   homeCreateUser({
    //     body: {
    //       name: this.state.name,
    //       email: this.state.email,
    //       gender: this.state.gender,
    //       mobileNo: this.state.mobileNo,
    //       password: this.state.password
    //     }
    //   })
    // );
  };
  render() {
    return (
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 100
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: 800
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <h5>{"Name:"}</h5>
            <TextField
              id="outlined-email-input"
              label="Name"
              variant="outlined"
              value={this.state.name}
              style={{
                width: 400,
                height: 100,
                margin: 5
              }}
              required
              onChange={event =>
                this.handleInputChangeName("name", event.target.value)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <h5>{"Email:"}</h5>
            <TextField
              id="outlined-email-input"
              label="Email"
              variant="outlined"
              value={this.state.email}
              style={{
                width: 400,
                height: 100,
                margin: 5
                // marginLeft: 30
              }}
              required
              onChange={event =>
                this.handleInputChangeEmail("email", event.target.value)
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <h5>{"Gender:"}</h5>
            <TextField
              id="outlined-email-input"
              label="Gender"
              variant="outlined"
              value={this.state.gender}
              style={{
                width: 400,
                height: 100,
                margin: 5
              }}
              required
              onChange={event =>
                this.handleInputChangeGender("gender", event.target.value)
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <h5>{"Mobile number:"}</h5>
            <TextField
              id="outlined-email-input"
              label="Mobile number"
              variant="outlined"
              value={this.state.mobileNo}
              style={{
                width: 400,
                height: 100,
                margin: 5,
                marginLeft: 30
              }}
              required
              onChange={event =>
                this.handleInputChangeMobile("mobileNo", event.target.value)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <h5>{"Password:"}</h5>
            <TextField
              id="outlined-email-input"
              label="Password"
              variant="outlined"
              value={this.state.password}
              style={{
                width: 400,
                height: 100,
                margin: 5
                // marginLeft: 30
              }}
              required
              onChange={event =>
                this.handleInputChangePassword("password", event.target.value)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Grid item xs={1}>
              <Icon
                style={{
                  display: "flex",
                  width: 90,
                  height: 10,
                  padding: 10,
                  paddingRight: 40,
                  paddingLeft: 40,
                  color: "#fff",
                  backgroundColor: "#f44336",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onClick={this.handleCreateUser}
              >
                ok
              </Icon>
            </Grid>

            <Grid item xs={1}>
              <Icon
                style={{
                  display: "flex",
                  width: 90,
                  height: 10,
                  padding: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  color: "#fff",
                  backgroundColor: "#f44336",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onClick={this.handleCreateUser}
              >
                Reset
              </Icon>
            </Grid>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default Register;
