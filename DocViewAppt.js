import React, { Component } from "react";
import {
  Box,
  Button,
  Heading,
  Grommet,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text,
} from "grommet";

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

export class DocViewAppt extends Component {
  state = { apptlist: [] };

  componentDidMount() {
    this.getNames();
  }

  getNames() {
    fetch("http://localhost:3001/doctorViewAppt")
      .then((res) => res.json())
      .then((res) => this.setState({ apptlist: res.data }));
  }

  render() {
    const { apptlist } = this.state;

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

          {/* Content Area */}
          <Box pad="medium">
            <Box
              elevation="small"
              pad="medium"
              background="lightGray"
              round="small"
              margin={{ bottom: "medium" }}
            >
              <Heading level="4" textAlign="start" color="brand">
                Appointments
              </Heading>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">ID</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Name</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Date</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Start Time</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Concerns</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Symptoms</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Status</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Actions</Text>
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apptlist.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell>
                        <Text>{appt.id}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appt.name}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>
                          {new Date(appt.date)
                            .toLocaleDateString()
                            .substring(0, 10)}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appt.starttime}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appt.concerns}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appt.symptoms}</Text>
                      </TableCell>
                      <TableCell>
                        <Text
                          color={
                            appt.status === "NotDone"
                              ? "statusNotDone"
                              : "statusDone"
                          }
                        >
                          {appt.status}
                        </Text>
                      </TableCell>
                      <TableCell>
                        {appt.status !== "Done" && (
                          <Box direction="row" gap="small">
                            <Button
                              label="Diagnose"
                              href={`/Diagnose/${appt.id}`}
                              size="small"
                              primary
                            />
                            <Button
                              label={
                                appt.status === "NotDone" ? "Cancel" : "Delete"
                              }
                              size="small"
                              color="statusNotDone"
                              onClick={() => {
                                fetch(
                                  "http://localhost:3001/deleteAppt?uid=" +
                                    appt.id
                                );
                                window.location.reload();
                              }}
                            />
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default DocViewAppt;
