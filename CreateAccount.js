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

export class CreateAccount extends Component {
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
        <Box
          fill
          align="center"
          justify="center"
          background="background"
          style={{
            minHeight: "140vh",
          }}
        >
          <Box
            width="medium"
            background="white"
            pad="large"
            round="small"
            elevation="xlarge"
            align="center"
            justify="start"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <Text
              color="#333333"
              size="large"
              weight="bold"
              textAlign="center"
              margin={{ bottom: "medium" }}
            >
              Patient's Registration Form
            </Text>
            <Form
              onReset={(event) => console.log(event)}
              method="post"
              onSubmit={({ value }) => {
                console.log("Submit", value);
                fetch(
                  "http://localhost:3001/checkIfPatientExists?email=" +
                    value.email
                )
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res.data[0]);

                    if (res.data[0]) {
                      window.alert(
                        "An account is already associated with that email."
                      );
                    } else {
                      fetch(
                        "http://localhost:3001/makeAccount?name=" +
                          value.firstName +
                          "&lastname=" +
                          value.lastName +
                          "&email=" +
                          value.email +
                          "&password=" +
                          value.password +
                          "&address=" +
                          value.address +
                          "&gender=" +
                          value.gender +
                          "&conditions=" +
                          value.conditions +
                          "&medications=" +
                          value.medications +
                          "&surgeries=" +
                          value.surgeries +
                          "&age=" +
                          value.age
                      );
                      window.location = "/Home";
                    }
                  });
              }}
            >
              <FormField
                label="First Name"
                name="firstName"
                placeholder="First name"
                required
                validate={{ regexp: /^[a-z]/i }}
              />
              <FormField
                label="Last Name"
                name="lastName"
                required
                placeholder="Last Name"
                validate={{ regexp: /^[a-z]/i }}
              />
              <FormField
                label="Gender"
                name="gender"
                placeholder="Female or Male"
                required
              />
              <FormField
                label="Age"
                name="age"
                placeholder="Age"
                type="number"
                required
                validate={[
                  {
                    regexp: /^[1-9][0-9]*$/,
                    message: "Please enter a valid age",
                  },
                  (value) => {
                    if (value < 13) {
                      return "Age must be at least 13";
                    }
                    return undefined;
                  },
                ]}
              />
              <FormField
                label="Medical History - Conditions"
                name="conditions"
                placeholder="Conditions"
              />
              <FormField
                label="Medical History - Surgeries"
                name="surgeries"
                placeholder="Surgeries"
              />
              <FormField
                label="Medical History - Medications"
                name="medications"
                placeholder="Medications"
              />
              <FormField
                label="Address"
                name="address"
                placeholder="Address"
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <FormField
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
                required
                validate={{
                  regexp: /^(?=.{8,})(?=.*[0-9]{2})/,
                  message: "At least 8 characters containing 2 digits",
                }}
              />
              <Box
                direction="row"
                align="center"
                justify="between"
                gap="small"
                margin={{ top: "medium" }}
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
              <Box align="center" pad="small" margin={{ top: "medium" }}>
                <Text color="#333333">Are you a doctor?</Text>
                <Button
                  primary
                  label="I'm a doctor"
                  href="/MakeDoc"
                  color="brand"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#ffffff",
                    color: "#0055AA",
                    border: "2px solid #0055AA",
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

export default CreateAccount;
