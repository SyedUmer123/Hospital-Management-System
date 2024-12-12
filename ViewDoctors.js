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
      brand: "#000000",
    },
    font: {
      family: "Lato",
    },
  },
};

export class ViewDoctors extends Component {
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
        <Box fill align="center" pad="medium">
          <Heading level={2}>Doctors List</Heading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Name
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Email
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Department
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.email}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.department_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            label="Back to Home"
            href="/Home"
            margin={{ top: "medium" }}
          />
        </Box>
      </Grommet>
    );
  }
}

export default ViewDoctors;
