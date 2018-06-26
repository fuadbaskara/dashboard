import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, Route } from "react-router-dom";
import axios from "axios";

import Page from "../Page";
import FormTravellers from "./FormTravellers";
import FormPhotographers from "./FormPhotographers";

class Manage extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        metadata: null,
        servicedata: null
      }
    };
    this.getData = this.getData.bind(this);
    this.getDataPhotographers = this.getDataPhotographers.bind(this);
  }

  async getDataPhotographers() {
    let uid = `${this.props.match.params.uid}`;
    let queryParams = `${
      process.env.REACT_APP_API_HOSTNAME
    }/api/photographers/${uid}`;

    console.log(queryParams);
    await axios
      .get(queryParams)
      .then(response => {
        {
          this.setState(prevState => {
            return {
              users: {
                ...prevState.users,
                servicedata: response.data.data
              }
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getData() {
    let userType = `${this.props.match.params.usertype}`;
    let uid = `${this.props.match.params.uid}`;
    let displayName = `${this.props.match.params.displayName}`;
    console.log(this.props.match.url);

    let queryParams = `${
      process.env.REACT_APP_API_HOSTNAME
    }/api/admin/users/?userType=${userType}&filter[${uid}]=${displayName}`;

    await axios
      .get(queryParams)
      .then(response => {
        if (response.data.data.length > 0) {
          this.setState(prevState => {
            return {
              users: {
                ...prevState.users,
                metadata: response.data.data[0]
              }
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getDataPhotographers();
    this.getData();
    console.log(this.state.users.metadata);
    console.log(this.state.users.servicedata);
  }

  render() {
    console.log(this.state.users.metadata);
    console.log(this.state.users.servicedata);
    return (
      <Page>
        {this.state.users.metadata && this.state.users.servicedata ? (
          <div className="container">
            {`${this.props.match.params.usertype}` === "t" ? (
              <div>
                <div className="m-3">
                  <h3>Traveller's Data</h3>
                </div>
                <div className="row">
                  <div className="col-md-3 col-lg-3 col-xl-3 mt-3">
                    <Link to={`${this.props.match.url}/metadata`}>
                      <Button>User Metadata</Button>
                    </Link>
                  </div>
                  <div className="col-md-9 col-lg-9 col-xl-9">
                    <Route
                      path={`${this.props.match.url}/`}
                      render={() => (
                        <FormTravellers
                          displayName={this.state.users.metadata.displayName}
                          uid={this.state.users.metadata.uid}
                          email={this.state.users.metadata.email}
                          userType={this.state.users.metadata.userType}
                          phoneNumber={this.state.users.metadata.phoneNumber}
                          created={this.state.users.metadata.created}
                          enable={this.state.users.metadata.enable}
                        />
                      )}
                    />
                    <Route
                      path={`${this.props.match.url}/metadata`}
                      render={() => (
                        <FormTravellers
                          displayName={this.state.users.metadata.displayName}
                          uid={this.state.users.metadata.uid}
                          email={this.state.users.metadata.email}
                          userType={this.state.users.metadata.userType}
                          phoneNumber={this.state.users.metadata.phoneNumber}
                          created={this.state.users.metadata.created}
                          enable={this.state.users.metadata.enable}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="m-3">
                  <h3>Photographer's Data</h3>
                </div>
                <div className="row">
                  <div className="col-sm-2 col-md-3 col-lg-3 col-xl-3 mt-3">
                    <Link to={`${this.props.match.url}/metadata`}>
                      <Button>User Metadata</Button>
                    </Link>
                    <Link to={`${this.props.match.url}/services`}>
                      <Button className="mt-3">Photographer Services</Button>
                    </Link>
                  </div>
                  <div className="col-sm-10 col-md-9 col-lg-9 col-xl-9">
                    <Route
                      exact
                      path={`${this.props.match.url}/`}
                      render={() => (
                        <FormPhotographers
                          displayName={this.state.users.metadata.displayName}
                          uid={this.state.users.metadata.uid}
                          email={this.state.users.metadata.email}
                          userType={this.state.users.metadata.userType}
                          phoneNumber={this.state.users.metadata.phoneNumber}
                          created={this.state.users.metadata.created}
                          enable={this.state.users.metadata.enable}
                        />
                      )}
                    />
                    <Route
                      path={`${this.props.match.url}/metadata`}
                      render={() => (
                        <FormPhotographers
                          displayName={this.state.users.metadata.displayName}
                          uid={this.state.users.metadata.uid}
                          email={this.state.users.metadata.email}
                          userType={this.state.users.metadata.userType}
                          phoneNumber={this.state.users.metadata.phoneNumber}
                          created={this.state.users.metadata.created}
                          enable={this.state.users.metadata.enable}
                        />
                      )}
                    />
                    <Route
                      path={`${this.props.match.url}/services`}
                      render={() => (
                        <FormPhotographers
                          displayName={this.state.users.metadata.displayName}
                          uid={this.state.users.metadata.uid}
                          email={this.state.users.metadata.email}
                          userType={this.state.users.metadata.userType}
                          phoneNumber={this.state.users.metadata.phoneNumber}
                          created={this.state.users.metadata.created}
                          enable={this.state.users.metadata.enable}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3>
              <strong>Loading Your Data..</strong>
            </h3>
          </div>
        )}
      </Page>
    );
  }
}

export default Manage;
