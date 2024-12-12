import React, { Component } from "react";
import { Box, Button, Heading, Grommet, FormField, Form, Text } from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // Primary color for branding
      focus: "#FFD700", // Focus color
      background: "#F8F8F8", // Light background
      text: "#333333", // Text color
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
  button: {
    primary: {
      color: "white", // Text color for primary buttons
      background: "brand", // Background for primary buttons
      hover: {
        background: "#333333", // Darker shade on hover
      },
    },
    extend: `
      font-size: 16px;
      font-weight: bold;
      border-radius: 8px;
    `,
  },
  formField: {
    border: {
      color: "brand", // Use brand color for form field borders
      position: "outer",
      style: "solid",
    },
    round: "none", // Rounded corners for form fields
  },
};

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="center"
    background="brand"
    pad={{ left: "medium", right: "medium", vertical: "small" }}
    {...props}
  />
);

export class AdminSettings extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          {/* App Bar */}
          <AppBar>
            <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
              <Heading level="3" margin="none" color="focus">
                HMS
              </Heading>
            </a>
          </AppBar>

          {/* Main Content */}
          <Box
            align="center"
            justify="center"
            pad="large"
            background="background"
            fill
          >
            <Box
              width="medium"
              pad="medium"
              background="white"
              round="small"
              elevation="small"
              gap="medium"
              margin={{ bottom: "large" }}
            >
              <Heading level="3" color="brand" textAlign="center">
                Change Password
              </Heading>

              <Form
                onSubmit={({ value }) => {
                  let email_in_use = "";
                  fetch("http://localhost:3001/userInSession")
                    .then((res) => res.json())
                    .then((res) => {
                      const email_in_use = res.email;
                      fetch(
                        `http://localhost:3001/resetPasswordAdmin?email=${email_in_use}&oldPassword=${value.oldPassword}&newPassword=${value.newPassword}`,
                        { method: "POST" }
                      )
                        .then((res) => res.json())
                        .then((res) => {
                          if (res.data.affectedRows === 0) {
                            window.alert(
                              "Entered your old password incorrectly"
                            );
                          } else {
                            window.alert("Password Reset Successful");
                          }
                        });
                    });
                }}
              >
                <FormField
                  type="password"
                  label={<Text weight="bold">Old Password</Text>}
                  name="oldPassword"
                  required
                />
                <FormField
                  type="password"
                  label={<Text weight="bold">New Password</Text>}
                  name="newPassword"
                  required
                />
                <Box direction="row" gap="medium" margin={{ top: "medium" }}>
                  <Button type="submit" label="Change Password" primary />
                  <Button
                    label="Back to Home"
                    href="/AdminHome"
                    style={{ flex: 1 }}
                  />
                </Box>
              </Form>
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default AdminSettings;
