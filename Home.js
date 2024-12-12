import React, { Component, useState } from "react";
import { Box, Button, Heading, Grommet, Text } from "grommet";
import "./App.css";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // High-contrast blue
      focus: "#FFD700", // Gold for focus
      active: "#FF4500", // Vibrant orange for buttons
      background: "#F8F8F8", // Light background
      text: "#000000", // Black text
    },
    font: {
      family: "Arial, sans-serif", // Using Lato font for the app
    },
  },
};

const SidebarButton = ({ label, active, onClick }) => (
  <Button
    plain
    onClick={onClick}
    style={{
      width: "200px", // Set a fixed width for the button
      background: active ? "#81FCED" : "#DADADA", // Highlight the active button
      color: "#000000",
      padding: "12px", // Adjust padding for a more compact look
      textAlign: "center",
      border: "none",
      marginBottom: "8px",
      fontSize: "16px",
      borderRadius: "20px", // Add rounded corners to the button
      transition: "background-color 0.3s ease", // Smooth transition for background color
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#0055AA")} // Hover effect
    onMouseOut={(e) =>
      (e.target.style.backgroundColor = active ? "#81FCED" : "#DADADA")
    } // Revert hover effect
    onMouseDown={(e) => (e.target.style.backgroundColor = "#81FCED")} // Click effect (change color when clicked)
    onMouseUp={(e) =>
      (e.target.style.backgroundColor = active ? "#81FCED" : "#DADADA")
    } // Revert to active or default color after clicking
  >
    {label}
  </Button>
);

const SidebarButtons = ({ setActive }) => {
  const [active, setActiveState] = useState(null);

  return (
    <Box fill pad="large" justify="center" align="center">
      {[
        "View Medical History",
        "View Appointments",
        "Schedule Appointment",
        "View Doctors' Schedule",
        "Settings",
        "Sign Out",
      ].map((label) => (
        <SidebarButton
          key={label}
          label={label}
          active={label === active}
          onClick={() => {
            setActiveState(label); // Update active button state
            if (label === "Schedule Appointment") {
              window.location = "/scheduleAppt";
            } else if (label === "Sign Out") {
              fetch("http://localhost:3001/endSession");
              window.location = "/";
            } else if (label === "View Appointments") {
              window.location = "/PatientsViewAppt";
            } else if (label === "View Medical History") {
              let email_in_use = "";
              fetch("http://localhost:3001/userInSession")
                .then((res) => res.json())
                .then((res) => {
                  var string_json = JSON.stringify(res);
                  var email_json = JSON.parse(string_json);
                  email_in_use = email_json.email;
                  console.log("Email In Use Is :" + email_in_use);
                  window.location = "/ViewOneHistory/" + email_in_use;
                });
            } else if (label === "View Doctors' Schedule") {
              fetch("http://localhost:3001/doctorSchedule")
                .then((res) => res.json())
                .then((appointments) => {
                  console.log("Doctors' Appointments: ", appointments);
                  // Redirect or display appointments as needed
                  window.location = "/DoctorSchedule";
                });
            } else if (label === "Settings") {
              window.location = "/Settings";
            }
          }}
        />
      ))}
    </Box>
  );
};

export class Home extends Component {
  renderName = ({ name, email }) => (
    <div key={email}>
      {name} {name}
    </div>
  );

  render() {
    const Header = () => (
      <Box
        tag="header"
        background="brand"
        pad="small"
        elevation="small"
        justify="center" // Center the content horizontally
        align="center" // Center the content vertically
        direction="row"
        flex={false}
        width="100%" // Make the header take up the full width
        style={{ borderBottom: "1px solid grey" }}
      >
        <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
          <Heading level="3" margin="none" color="focus">
            HMS
          </Heading>
        </a>
      </Box>
    );

    return (
      <Grommet full={true} theme={theme}>
        <Box fill={true}>
          <Header />
          <Box
            fill
            justify="center"
            align="center"
            pad="large"
            direction="column"
          >
            <Heading color="#000000">Welcome Patient</Heading>
            <SidebarButtons setActive={() => {}} />{" "}
            {/* Show the buttons in the main area */}
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default Home;
