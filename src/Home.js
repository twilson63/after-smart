import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: "whatevs", clientState: ctx.clientState };
  }
  render() {
    console.log(this.props);
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Welcome to After.js</h2>
        </div>
        <p className="Home-intro">
          To get started, edit
          <code>src/Home.js</code> or <code>src/About.js</code>and save to
          reload.
        </p>
        <Link to="/about">About -></Link>
        <div>{JSON.stringify(this.props.clientState)}</div>
      </div>
    );
  }
}

export default Home;
