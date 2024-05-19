import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [userFormData, setUserFormData] = useState({ username: "", email: "", password: "",}); // form state
  const [validated] = useState(false); // form validation
  const [showAlert, setShowAlert] = useState(false); // alert state

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (!data) {
        throw new Error("Error!");
      }

      const token = await data.createUser.token;

      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form
      id="signup-form"
      className="signup-form"
      noValidate
      validated={validated}
      onSubmit={handleFormSubmit}
    >
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        Something went wrong!
      </Alert>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="username" className="form-label">
          Username:
        </Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <Form.Control.Feedback type="invalid">
          Username is required!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="email" className="form-label">
          Email:
        </Form.Label>
        <Form.Control
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          Email is required!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password" className="form-label">
          Password:
        </Form.Label>
        <Form.Control
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type="invalid">
          Password is required!
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="btn btn-success">
        Sign Up
      </Button>
    </Form>
  );
};

export default Signup;
