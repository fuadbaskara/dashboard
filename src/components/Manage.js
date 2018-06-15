import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

// import { Route, Link } from "react-router-dom";
import axios from "axios";

import Page from "../Page";

class Manage extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        metadata: null,
        servicedata: null
      }
    };
    this.getDataTraveller = this.getDataTraveller.bind(this);
    this.getDataPhotographer = this.getDataPhotographer.bind(this);
  }

  async getDataTraveller() {
    // let userType = `${this.props.match.params.usertype}`;
    let uid = `${this.props.match.params.uid}`;
    // let displayName = `${this.props.match.params.displayName}`;
    // let queryParams = ``;
    // console.log(userType);
    // console.log(uid);
    // console.log(displayName);
    // if (userType === "p") {
    let queryParams = `${
      process.env.REACT_APP_API_HOSTNAME
    }/api/photographers/${uid}`;
    // } else {
    //   queryParams = `${
    //     process.env.REACT_APP_API_HOSTNAME
    //   }/api/admin/users/?userType=${userType}&filter[${uid}]=${displayName}`;
    // }
    console.log(queryParams);
    await axios
      .get(queryParams)
      .then(response => {
        if (response.data.data.length > 0) {
          this.setState({
            users: {
              metadata: response.data.data[0]
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getDataPhotographer() {
    let userType = `${this.props.match.params.usertype}`;
    let uid = `${this.props.match.params.uid}`;
    let displayName = `${this.props.match.params.displayName}`;

    let queryParams = `${
      process.env.REACT_APP_API_HOSTNAME
    }/api/admin/users/?userType=${userType}&filter[${uid}]=${displayName}`;

    await axios
      .get(queryParams)
      .then(response => {
        if (response.data.data.length > 0) {
          this.setState({
            users: {
              servicedata: response.data.data[0]
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async componentDidMount() {
    await this.getDataTraveller();
    await this.getDataPhotographer();
    console.log(this.state.users.metadata);
    console.log(this.state.users.servicedata);
    console.log(this.state.users.servicedata.countryName);
  }

  render() {
    return (
      <Page>
        {this.state.users &&
        this.state.users.servicedata &&
        this.state.users.servicedata.countryName ? (
          <div className="container">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Country</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  value={this.state.users.servicedata.countryName}
                />
              </FormGroup>
            </Form>
          </div>
        ) : (
          <div className="container">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Country</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  value="None"
                />
              </FormGroup>
            </Form>
          </div>
        )}
      </Page>
    );
  }
}

export default Manage;
