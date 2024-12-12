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
      family: "Arial, sans-serif",
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

export class ViewDoctorsAdmin extends Component {
  state = {
    doctors: [],
  };

  componentDidMount() {
    this.fetchDoctors();
  }

  fetchDoctors = () => {
    fetch("http://localhost:3001/api/doctors")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ doctors: data });
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        alert("Failed to load doctors. Please try again.");
      });
  };

  render() {
    const { doctors } = this.state;

    return (
      <Grommet theme={theme} full>
        <Box fill align="center" pad="medium" background="background">
          <Heading level={2} color="brand" margin={{ bottom: "medium" }}>
            Doctors List
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
                  <strong>Department</strong>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.email}>
                  <TableCell pad="small">{doctor.name}</TableCell>
                  <TableCell pad="small">{doctor.email}</TableCell>
                  <TableCell pad="small">{doctor.department_name}</TableCell>
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

export default ViewDoctorsAdmin;
