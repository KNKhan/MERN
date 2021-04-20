import React from "react";
import "./Dashboard.css";
import Header from "../Header/Header";
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      user: {}
    };
  }

  componentDidMount() {
    if (this.props.usertoken) {
      axios
        .get("http://localhost:9000/user/", {
          headers: {
            "X-Auth-Token": this.props.usertoken,
            "content-type": "application/json"
          }
        })
        .then(resp => {
          this.setState({ user: resp.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.user ? <Header user={this.state.user} /> : ""}
        <div className="whitesection"></div>
      </div>
    );
  }
}
export default Dashboard;
