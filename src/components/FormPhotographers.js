import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { database } from "../services/database.js";

export default class FormPhotographers extends React.Component {
  constructor(props) {
    super(props);
    (this.displayName = this.props.displayName),
      (this.uid = this.props.uid),
      (this.email = this.props.email),
      (this.userType = this.props.userType),
      (this.phoneNumber = this.props.phoneNumber),
      (this.created = this.props.created),
      (this.enable = this.props.enable);
    this.state = {
      formStatus: false,
      displayName: this.displayName,
      uid: this.uid,
      email: this.email,
      userType: this.userType,
      phoneNumber: this.phoneNumber,
      created: this.created,
      enable: this.enable,
      displayNameEdit: this.displayName,
      uidEdit: this.uid,
      emailEdit: this.email,
      userTypeEdit: this.userType,
      phoneNumberEdit: this.phoneNumber,
      createdEdit: this.created
    };
    this.handleChange_formStatus = this.handleChange_formStatus.bind(this);
    this.handleChange_displayName = this.handleChange_displayName.bind(this);
    this.handleChange_email = this.handleChange_email.bind(this);
    this.handleChange_userType = this.handleChange_userType.bind(this);
    this.handleChange_phoneNumber = this.handleChange_phoneNumber.bind(this);
    this.handleChange_created = this.handleChange_created.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
  }

  handleChange_formStatus(event) {
    let value = event.target.value;
    this.setState(() => {
      return { formStatus: true };
    });
  }

  handleChange_displayName(event) {
    let value = event.target.value;
    this.setState(() => {
      return { displayNameEdit: value };
    });
  }

  handleChange_uid(event) {
    let value = event.target.value;
    this.setState(() => {
      return { uidEdit: value };
    });
  }

  handleChange_email(event) {
    let value = event.target.value;
    this.setState(() => {
      return { emailEdit: value };
    });
  }

  handleChange_userType(event) {
    let value = event.target.value;
    this.setState(() => {
      return { userTypeEdit: value };
    });
  }

  handleChange_phoneNumber(event) {
    let value = event.target.value;
    this.setState(() => {
      return { phoneNumberEdit: value };
    });
  }

  handleChange_created(event) {
    let value = event.target.value;
    this.setState(() => {
      return { createdEdit: value };
    });
  }

  async saveToDatabase() {
    var uid = this.uid;
    var user_metadataRef = database
      .database()
      .ref()
      .child("user_metadata");
    var uidRef = user_metadataRef.child(uid);

    await uidRef.update({
      displayName: this.state.displayNameEdit,
      email: this.state.emailEdit,
      userType: this.state.userTypeEdit,
      phoneNumber: this.state.phoneNumberEdit
    });

    alert("the data successfully updated");
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Form>
          {this.state.formStatus === true ? (
            <div>
              <FormGroup>
                <Label for="">Display Name</Label>
                <Input
                  placeholder="with a placeholder"
                  onChange={this.handleChange_displayName}
                  value={this.state.displayNameEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label for="">User ID</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  onChange={this.handleChange_uid}
                  value={this.state.uidEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">E-mail</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  onChange={this.handleChange_email}
                  value={this.state.emailEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label for="l">User Type</Label>
                <Input
                  placeholder="with a placeholder"
                  onChange={this.handleChange_userType}
                  value={this.state.userTypeEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label for="">Phone Number</Label>
                <Input
                  placeholder="with a placeholder"
                  onChange={this.handleChange_phoneNumber}
                  value={this.state.phoneNumberEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label for="">Created ID</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  onChange={this.handleChange_created}
                  value={this.state.createdEdit}
                />
              </FormGroup>
              <FormGroup>
                {this.enable === 1 ? (
                  <div>
                    <Label for="exampleEmail">Account Status</Label>
                    <Input plaintext>
                      <b className="text-success">Active</b>
                    </Input>
                  </div>
                ) : (
                  <div>
                    <Label for="exampleEmail">Account Status</Label>
                    <Input plaintext>
                      <b className="text-danger">Suspend</b>
                    </Input>
                  </div>
                )}
              </FormGroup>
              <div className="d-flex justify-content-end pb-3" />
            </div>
          ) : (
            <div>
              <FormGroup>
                <Label for="">Display Name</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  value={this.displayName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="">User ID</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  value={this.uid}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">E-mail</Label>
                <Input
                  disabled
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  value={this.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="l">User Type</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  value={this.userType}
                />
              </FormGroup>
              <FormGroup>
                <Label for="">Phone Number</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  value={this.phoneNumber}
                />
              </FormGroup>
              <FormGroup>
                <Label for="">Created ID</Label>
                <Input
                  disabled
                  placeholder="with a placeholder"
                  value={this.created}
                />
              </FormGroup>
              <FormGroup>
                {this.enable === 1 ? (
                  <div>
                    <Label for="exampleEmail">Account Status</Label>
                    <Input plaintext>
                      <b className="text-success">Active</b>
                    </Input>
                  </div>
                ) : (
                  <div>
                    <Label for="exampleEmail">Account Status</Label>
                    <Input plaintext>
                      <b className="text-danger">Suspend</b>
                    </Input>
                  </div>
                )}
              </FormGroup>
              <div className="d-flex justify-content-end pb-3" />
            </div>
          )}
        </Form>
        <Button
          className="mr-3 btn-dark"
          onClick={this.handleChange_formStatus}
        >
          Edit
        </Button>
        <Button className="btn-success" onClick={this.saveToDatabase}>
          Submit
        </Button>
      </div>
    );
  }
}
