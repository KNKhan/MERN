import React from "react";
import "./Login.css";
import axios from "axios";
import Alert from "../Alert/Alert";
import closures from "../Assets/js/closures";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      logintype: "",
      alertText: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      tokenSet: "",
      formerror: []
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onEscPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscPress, false);
  }

  onEscPress = (event) => {
    if (event.key === 'Escape' && this.state.alertText) {
      this.onAlertClose();
    }
  }

  formToggle = () => {
    this.setState({ formerror: [], signIn: !this.state.signIn });
  };

  onInputchange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.logintype == "New Candidate") {
      if (this.state.signIn) {
        axios({
          method: "post",
          url: "http://localhost:9000/auth/",
          data: {
            name: this.state.username,
            password: this.state.password
          }
        })
          .then(resp => {
            if (resp.status == 200) {
              this.props.tokenSet(resp.data.token);
            }
          })
          .catch(error => {
            if (error.response.data.errors.length > 0) {
              var err = [];
              for (var i = 0; i < error.response.data.errors.length; i++) {
                err.push(error.response.data.errors[i].msg);
              }
              this.setState({ formerror: err });
            }
          });
      }
    }

    if (!this.state.signIn) {
      axios({
        method: "post",
        url: "http://localhost:9000/user/",
        data: {
          name: this.state.username,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }
      })
        .then(resp => {
          if (resp.status == 200) {
            this.setState({
              alertText: "User Registered! Click SignIn to login"
            });
          }
        })
        .catch(error => {
          if (error.response.data.errors.length > 0) {
            var err = [];
            for (var i = 0; i < error.response.data.errors.length; i++) {
              err.push(error.response.data.errors[i].msg);
            }
            this.setState({ formerror: err });
          }
        });
    }

    if (this.state.logintype == "Employee") {
      this.setState({ alertText: "Employee SSO is yet to be integrated!" });
    }
  };

  onAlertClose = () => {
    this.setState({ alertText: "" });
  };

  render() {
    return (
      <div>
        {this.state.alertText != "" ? (
          <Alert text={this.state.alertText} onAlertClose={this.onAlertClose} />
        ) : (
          ""
        )}
        <div className="login">
          <div className="logincontainer">
            <div className="loginpanel">
              <h3>{this.state.signIn ? "Sign In" : "Register User"}</h3>
              <form onSubmit={this.handleSubmit} noValidate>
                {this.state.signIn ? (
                  <p>
                    <label>Select Type</label>
                    <select onChange={this.onInputchange} name="logintype">
                      <option selected>- Select Candidate Type -</option>
                      <option>Employee</option>
                      <option>New Candidate</option>
                    </select>
                  </p>
                ) : (
                  ""
                )}
                <p className="error">
                  {this.state.formerror != ""
                    ? this.state.formerror.map((data, index) => {
                      return <p key={index}>{data}</p>;
                    })
                    : ""}
                </p>
                <p>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.onInputchange}
                  />
                </p>
                {this.state.signIn ? (
                  ""
                ) : (
                  <p>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={this.onInputchange}
                    />
                  </p>
                )}
                <p>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.onInputchange}
                  />
                </p>
                {!this.state.signIn ? (
                  <p>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="confirmPassword"
                      onChange={this.onInputchange}
                    />
                  </p>
                ) : (
                  ""
                )}

                <button type="submit">
                  {this.state.signIn ? "Login" : "Add User"}
                </button>
              </form>
              <span onClick={this.formToggle} className="formtoggle">
                {this.state.signIn ? "Click to Register" : "Click to SignIn"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
