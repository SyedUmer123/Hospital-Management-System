import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  Box,
  Button,
  Heading,
  Grommet,
  FormField,
  Form,
  CheckBox,
} from "grommet";

import "./App.css";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // High-contrast blue
      focus: "#FFD700", // Gold for better visibility
      active: "#FF4500", // Vibrant orange for buttons
      background: "#F8F8F8", // Light background for readability
      text: "#000000", // Black text for strong contrast
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
  formField: {
    extend: () => `
      input {
        color: #333333;
        font-size: 1rem;
      }
      ::placeholder {
        color: #AAAAAA;
      }
    `,
  },
};

const AppBar = () => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="center"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    style={{ zIndex: "1" }}
  >
    <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
      <Heading level="3" margin="none" color="focus">
        HMS
      </Heading>
    </a>
  </Box>
);

const LogIn = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleDoctorChange = (event) => {
    setIsDoctor(event.target.checked);
    if (event.target.checked) {
      setIsAdmin(false); // Ensure only one checkbox is selected
    }
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
    if (event.target.checked) {
      setIsDoctor(false); // Ensure only one checkbox is selected
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, isDoc, isAdmin } = event.target.elements;

    // Determine login type
    const endpoint = isAdmin.checked
      ? "checkAdminLogin"
      : isDoc.checked
      ? "checkDoclogin"
      : "checklogin";

    // Perform login request
    fetch(
      `http://localhost:3001/${endpoint}?email=${email.value}&password=${password.value}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid login credentials"); // Handle HTTP errors
        }
        return res.json();
      })
      .then((res) => {
        if (res.data.length === 0) {
          window.alert("Invalid email or password. Please try again.");
        } else {
          if (isAdmin.checked) {
            navigate("/AdminHome");
          } else if (isDoc.checked) {
            navigate("/DocHome");
          } else {
            navigate("/Home");
          }
        }
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        window.alert(error.message);
      });
  };

  return (
    <Grommet theme={theme} full>
      <AppBar />

      <Box
        fill
        align="center"
        justify="center"
        pad="medium"
        background="background"
      >
        <Box
          width="medium"
          pad="medium"
          background="white"
          round="small"
          elevation="small"
        >
          <Form onSubmit={handleSubmit}>
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Please enter your email."
              required
            />
            <FormField
              type="password"
              label="Password"
              name="password"
              placeholder="Please enter your password."
              required
            />
            <FormField
              component={CheckBox}
              checked={isDoctor}
              margin="large"
              label="I'm a doctor"
              name="isDoc"
              onChange={handleDoctorChange}
            />
            <FormField
              component={CheckBox}
              checked={isAdmin}
              margin="large"
              label="I'm an admin"
              name="isAdmin"
              onChange={handleAdminChange}
            />
            <Box direction="column" align="center">
              <Button
                type="submit"
                label="Log In"
                fill="horizontal"
                primary
                style={{ margin: "1rem 0", color: "#ffffff" }}
              />
              <Button
                label="Create Account"
                fill="horizontal"
                href="/createAcc"
                style={{ textAlign: "center", margin: "0.5rem" }}
              />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default LogIn;
