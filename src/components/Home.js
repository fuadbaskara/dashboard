import React, { Component } from "react";
import Page from "../Page";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <Page>
        <div className="d-flex justify-content-start">
          <h2 className="mr-5">Admin Homepage</h2>
          <div className="mr-5">
            <Link to={`/users/t`}>
              <button className="btn btn-dark btn-info btn-sm">
                Traveller's Data
              </button>
            </Link>
          </div>
          <div className="mr-5">
            <Link to={`/users/p`}>
              <button className="btn btn-dark btn-info btn-sm">
                Photographer's Data
              </button>
            </Link>
          </div>
        </div>
      </Page>
    );
  }
}

export default Home;
