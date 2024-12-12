import React, { Component } from "react";
import { Box, Button, Heading, Grommet, FormField, Form, Text } from "grommet";
import "./App.css";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // Primary brand color (blue)
      focus: "#FFD700", // Gold focus color for input fields
      background: "#f5f5f5", // Light background color
      text: "#333333", // Dark text for contrast
      accent: "#4CAF50", // Accent color for success (green)
      button: "#6200ea", // Purple button color
    },
    font: {
      family: "Arial, sans-serif",
      size: "14px", // Consistent font size
    },
    input: {
      font: {
        family: "Arial, sans-serif", // Custom font for input text
        size: "16px", // Font size for input text
      },
    },
  },
};
const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="center"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    style={{ zIndex: "1" }}
    {...props}
  />
);

export class MakeDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grommet theme={theme} full>
        <AppBar>
          <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
            <Heading level="3" margin="none" color="focus">
              HMS
            </Heading>
          </a>
        </AppBar>
        <Box fill align="center" justify="center" background="background">
          <Box
            width="medium"
            background="white"
            pad="large"
            round="small"
            elevation="xlarge"
            align="center"
            justify="start"
            style={{
              minHeight: "85vh", // Matches the height of the form box
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box", // Ensures padding is included in height
            }}
          >
            <Text
              color="#333333"
              size="large"
              weight="bold"
              textAlign="center"
              margin={{ bottom: "medium" }}
            >
              Doctor's Registration Form
            </Text>
            <Form
              onReset={(event) => console.log(event)}
              method="post"
              onSubmit={({ value }) => {
                console.log("Submit", value);
                fetch(
                  "http://localhost:3001/checkIfDocExists?email=" + value.email
                )
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res.data[0]);
                    if (res.data[0]) {
                      window.alert(
                        "A doctor is already associated with that email."
                      );
                    } else {
                      fetch(
                        "http://localhost:3001/makeDocAccount?name=" +
                          value.firstName +
                          "&lastname=" +
                          value.lastName +
                          "&email=" +
                          value.email +
                          "&password=" +
                          value.password +
                          "&gender=" +
                          value.gender +
                          "&schedule=" +
                          value.schedule
                      );
                      window.location = "/DocHome";
                    }
                  });
              }}
            >
              <FormField
                label="First Name"
                name="firstName"
                required
                placeholder="Please enter your first name."
                validate={{ regexp: /^[a-z]/i }}
              />
              <FormField
                label="Last Name"
                name="lastName"
                required
                placeholder="Please enter your last name."
                validate={{ regexp: /^[a-z]/i }}
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="Please enter your email."
                required
              />
              <FormField
                label="Schedule No"
                name="schedule"
                placeholder="Please enter schedule number"
                required
              />
              <FormField
                label="Gender"
                name="gender"
                placeholder="Female or Male"
                required
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                required
                placeholder="Please enter your password."
                validate={{
                  regexp: /^(?=.{8,})(?=.*[0-9]{2})/,
                  message: "At least 8 characters containing 2 digits",
                }}
              />
              <Box
                direction="row"
                align="center"
                justify="between"
                gap="medium"
                margin={{ top: "medium" }}
                style={{ width: "100%" }}
              >
                <Button
                  label="Cancel"
                  href="/"
                  primary
                  color="brand"
                  style={{
                    borderRadius: "20px",
                    border: "2px solid #0055AA",
                    backgroundColor: "#0055AA",
                    color: "#ffffff",
                    flex: 1,
                    marginRight: "10px",
                  }}
                />
                <Button
                  label="Sign Up"
                  fill="horizontal"
                  type="submit"
                  primary
                  color="brand"
                  style={{
                    borderRadius: "20px",
                    border: "2px solid #0055AA",
                    backgroundColor: "#0055AA",
                    color: "#ffffff",
                  }}
                />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default MakeDoc;
