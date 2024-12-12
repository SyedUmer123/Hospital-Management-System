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
      family: "Arial, sans-serif", // Consistent font
    },
  },
  button: {
    default: {
      color: "text",
    },
    hover: {
      background: {
        color: "#DADADA", // Light gray for hover state
      },
    },
  },
};

const SidebarButton = ({ label, active, onClick }) => (
  <Button
    plain
    onClick={onClick}
    style={{
      width: "180px", // Shortened width for the button
      background: active ? "#FF4500" : "#DADADA", // active button with orange background
      color: "#000000",
      padding: "12px",
      textAlign: "center",
      border: "none",
      marginBottom: "8px",
      fontSize: "16px",
      borderRadius: "25px", // Rounded corners
      transition: "background-color 0.3s ease", // Smooth transition for background color
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#0055AA")} // Light grey on hover
    onMouseOut={(e) =>
      (e.target.style.backgroundColor = active ? "#81FCED" : "#DADADA")
    } // Revert on mouse out
    onMouseDown={(e) => (e.target.style.backgroundColor = "#81FCED")} // Red color when clicked
    onMouseUp={(e) =>
      (e.target.style.backgroundColor = active ? "#81FCED" : "#DADADA")
    } // Revert to active color or default
  >
    {label}
  </Button>
);

const SidebarButtons = ({ setActive }) => {
  const [active, setActiveState] = useState(null);

  return (
    <Box fill pad="large" justify="center" align="center">
      {["Appointments", "View Patients", "Settings", "Sign Out"].map(
        (label) => (
          <SidebarButton
            key={label}
            label={label}
            active={label === active}
            onClick={() => {
              setActiveState(label); // Set active state when button is clicked
              if (label === "Appointments") {
                window.location = "/ApptList";
              } else if (label === "Sign Out") {
                fetch("http://localhost:3001/endSession");
                window.location = "/";
              } else if (label === "Settings") {
                window.location = "/DocSettings";
              } else if (label === "View Patients") {
                window.location = "/MedHistView";
              }
            }}
          />
        )
      )}
    </Box>
  );
};

export class DocHome extends Component {
  render() {
    const Header = () => (
      <Box
        tag="header"
        background="brand"
        pad="small"
        elevation="small"
        justify="center" // Center the heading horizontally
        align="center" // Center the heading vertically
        direction="row"
        flex={false}
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
      <Grommet full theme={theme}>
        <Box fill>
          <Header />
          <Box
            fill
            justify="center"
            align="center"
            pad="large"
            direction="column"
          >
            <Heading color="text">Welcome Doctor</Heading>
            <SidebarButtons setActive={() => {}} />{" "}
            {/* Show the buttons in the main area */}
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default DocHome;
