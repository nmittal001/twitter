import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component {
  render() {
    return (
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "cent   er",
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
            <h5>{"Email:"}</h5>
            <TextField
              id="outlined-email-input"
              label="Tweet"
              variant="outlined"
              // value={this.state.emailId}
              style={{
                width: 400,
                height: 100,
                margin: 5,
                marginLeft: 30
              }}
              required
              // onChange={event =>
              //   this.handleInputChange("user_name", event.target.value)
              // }
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
              label="Tweet"
              variant="outlined"
              // value={this.state.password}
              style={{
                width: 400,
                height: 100,
                margin: 5,
                marginLeft: 30
              }}
              required
              // onChange={event =>
              //   this.handleInputChange("user_name", event.target.value)
              // }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <button>Login</button>
            <button>Reset</button>
          </div>
        </Card>
      </Grid>
    );
  }
}
export default Login;
