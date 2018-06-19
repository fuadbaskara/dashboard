import React, { Component } from "react";
import Page from "../Page";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <Page>
        <div className="d-flex justify-content-center">
          <div>
            <h2 className="mr-5">Admin Homepage</h2>
            <h6> Choose your data collection: </h6>
            <div className="d-flex justify-content-start">
              <div className="mr-3">
                <Link to={`/users/t`}>
                  <button className="btn btn-lg btn-dark btn-info btn-sm">
                    Traveller's Data
                  </button>
                </Link>
              </div>
              <div className="mr-3">
                <Link to={`/users/p`}>
                  <button className="btn btn-lg btn-dark btn-info btn-sm">
                    Photographer's Data
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Home;
