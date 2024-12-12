import React, { Component } from "react";
import {
  Box,
  Button,
  Grommet,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // Use a deep blue brand color
      background: "#F8F8F8", // Light background for contrast
      focus: "#FFD700", // Gold color for focus
    },
    font: {
      family: "Arial, sans-serif", // Using Lato font for the app
    },
  },
  table: {
    // Add some padding and border for a cleaner look
    border: {
      color: "#eaeaea",
      size: "1px",
    },
  },
};

export class ViewPatients extends Component {
  state = {
    patients: [], // Change from doctors to patients
  };

  componentDidMount() {
    this.fetchPatients(); // Fetch patients instead of doctors
  }

  fetchPatients = () => {
    fetch("http://localhost:3001/api/patients") // Update the endpoint to /api/patients
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ patients: data }); // Update state with patient data
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        alert("Failed to load patients. Please try again.");
      });
  };

  render() {
    const { patients } = this.state; // Use patients instead of doctors

    return (
      <Grommet theme={theme} full>
        <Box fill align="center" pad="medium" background="background">
          <Heading level={2} color="brand" margin={{ bottom: "medium" }}>
            Patients List
          </Heading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom" pad="small">
                  <strong>Name</strong>
                </TableCell>
                <TableCell scope="col" border="bottom" pad="small">
                  <strong>Email</strong>
                </TableCell>
                <TableCell scope="col" border="bottom" pad="small">
                  <strong>Age</strong>
                </TableCell>
                <TableCell scope="col" border="bottom" pad="small">
                  <strong>Gender</strong>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.email}>
                  <TableCell pad="small">{patient.name}</TableCell>
                  <TableCell pad="small">{patient.email}</TableCell>
                  <TableCell pad="small">{patient.age}</TableCell>
                  <TableCell pad="small">{patient.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box direction="row" gap="small" margin={{ top: "medium" }}>
            <Button
              label="Back to Home"
              href="/AdminHome"
              primary
              color="brand"
              style={{ flex: 1 }}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default ViewPatients;
