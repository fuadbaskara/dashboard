import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const FormPhotographers = ({
  displayName,
  uid,
  email,
  userType,
  phoneNumber,
  created,
  enable
}) => (
  <div>
    <Form>
      <FormGroup>
        <Label for="">Display Name</Label>
        <Input placeholder="with a placeholder" value={displayName} />
      </FormGroup>
      <FormGroup>
        <Label for="">User ID</Label>
        <Input placeholder="with a placeholder" value={uid} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">E-mail</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="with a placeholder"
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="l">User Type</Label>
        <Input placeholder="with a placeholder" value={userType} />
      </FormGroup>
      <FormGroup>
        <Label for="">Phone Number</Label>
        <Input placeholder="with a placeholder" value={phoneNumber} />
      </FormGroup>
      <FormGroup>
        <Label for="">Created ID</Label>
        <Input placeholder="with a placeholder" value={created} />
      </FormGroup>
      <FormGroup>
        {enable === 1 ? (
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
      <div className="d-flex justify-content-end pb-3">
        <Button className="btn-block">Submit</Button>
      </div>
    </Form>
  </div>
);
export default FormPhotographers;
