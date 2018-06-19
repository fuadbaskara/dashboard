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
        metadata: null
      }
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
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
              metadata: response.data.data[0]
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async componentDidMount() {
    await this.getData();
    console.log(this.state.users.metadata);
  }

  render() {
    return (
      <Page>
        {this.state.users &&
        this.state.users.metadata &&
        this.state.users.metadata.displayName ? (
          <div className="container">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Display Name</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  value={this.state.users.metadata.displayName}
                />
              </FormGroup>
            </Form>
          </div>
        ) : (
          <div className="container">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Display Name</Label>
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
