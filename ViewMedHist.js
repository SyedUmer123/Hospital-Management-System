import React, { Component } from "react";
import { Box, Button, Heading, Grommet, FormField, Form, Text } from "grommet";
import "./App.css";

const theme = {
  global: {
    colors: {
      brand: "#0055AA",
      focus: "#FFD700",
      background: "#f9f9f9",
      lightGray: "#f0f0f0",
      statusNotDone: "#FF4040",
      statusDone: "#00C781",
    },
    font: {
      family: "Arial, sans-serif",
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

export class ViewMedHist extends Component {
  state = {
    medhiststate: [],
    emailInUse: "",
  };

  componentDidMount() {
    fetch("http://localhost:3001/userInSession")
      .then((res) => res.json())
      .then((res) => {
        const email = res.email;
        console.log("Logged-in user's email:", email);
        this.setState({ emailInUse: email }, () => {
          this.getNames("");
        });
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
        alert("Failed to fetch user session. Please log in again.");
      });
  }

  getNames(value) {
    const patName = value || " ";
    const { emailInUse } = this.state;

    if (!emailInUse) {
      console.error("Email is not available. Cannot fetch medical history.");
      return;
    }

    console.log("Patient Name:", patName);

    fetch(
      `http://localhost:3001/MedHistView?name=${encodeURIComponent(
        patName
      )}&email_in_use=${encodeURIComponent(emailInUse)}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => this.setState({ medhiststate: res.data }))
      .catch((error) => {
        console.error("Error fetching medical history:", error);
        alert("Failed to load medical history. Please try again.");
      });
  }

  render() {
    const { medhiststate } = this.state;

    return (
      <Grommet theme={theme} full>
        <Box fill background="background">
          <AppBar>
            <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
              <Heading level="3" margin="none" color="focus">
                HMS
              </Heading>
            </a>
          </AppBar>

          <Box pad="medium">
            <Box
              elevation="small"
              pad="medium"
              background="lightGray"
              round="small"
              margin={{ bottom: "medium" }}
              width="60%" // Centering the form
              alignSelf="center" // Centering horizontally
            >
              <Heading level="4" textAlign="start" color="brand">
                Medical History
              </Heading>

              {/* Smaller and centered search bar */}
              <Form
                onSubmit={({ value }) => {
                  this.getNames(value.email);
                }}
              >
                <h4 style={{ textAlign: "center", marginBottom: "0" }}>
                  Search By Name
                </h4>
                <FormField
                  name="email"
                  align="center"
                  style={{
                    width: "100%", // Full width of the parent container
                    maxWidth: "400px", // Maximum width for the input
                    margin: "0 auto", // Center the input field
                  }}
                />
                <div align="center">
                  <Button
                    type="submit"
                    primary
                    label="Submit"
                    size="small" // Smaller button
                    style={{ marginTop: "10px" }} // Space between input and button
                  />
                </div>
              </Form>
            </Box>

            <Box
              elevation="small"
              pad="medium"
              background="lightGray"
              round="small"
              margin={{ top: "medium" }}
            >
              <table style={{ width: "100%", textAlign: "center" }}>
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Name</th>
                    <th style={{ width: "50%" }}>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {medhiststate.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.Name}</td>
                      <td>
                        <Button
                          label="Medical Profile"
                          href={"/ViewOneHistory/" + patient.email}
                          size="small"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default ViewMedHist;
