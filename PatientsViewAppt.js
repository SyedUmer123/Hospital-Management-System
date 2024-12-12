import React, { Component } from "react";
import {
  Box,
  Heading,
  Grommet,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text,
} from "grommet";

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

export class PatientsViewAppointments extends Component {
  state = { appointmentsState: [] };

  componentDidMount() {
    this.getNames("");
  }

  getNames(value) {
    let patName = value;
    console.log(patName);
    fetch("http://localhost:3001/userInSession")
      .then((res) => res.json())
      .then((res) => {
        var email_in_use = res.email;
        fetch("http://localhost:3001/patientViewAppt?email=" + email_in_use)
          .then((res) => res.json())
          .then((res) => {
            this.setState({ appointmentsState: res.data });
          });
      });
  }

  render() {
    const { appointmentsState } = this.state;

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
                      <Text weight="bold">Date</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">Start Time</Text>
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      <Text weight="bold">End Time</Text>
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
                  {appointmentsState.map((appointment) => (
                    <TableRow key={appointment.ID}>
                      <TableCell>
                        <Text>
                          {new Date(appointment.theDate)
                            .toLocaleDateString()
                            .substring(0, 10)}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appointment.theStart.substring(0, 5)}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appointment.theEnd.substring(0, 5)}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appointment.theConcerns}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{appointment.theSymptoms}</Text>
                      </TableCell>
                      <TableCell>
                        <Text
                          color={
                            appointment.status === "NotDone"
                              ? "statusNotDone"
                              : "statusDone"
                          }
                        >
                          {appointment.status}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Box direction="row" gap="small">
                          {/* Disable See Diagnosis Button if Payment is not Paid */}
                          <Button
                            label="See Diagnosis"
                            href={
                              appointment.payment_status === "Paid"
                                ? `/showDiagnoses/${appointment.ID}`
                                : undefined
                            }
                            size="small"
                            primary
                            disabled={appointment.payment_status !== "Paid"}
                          />
                          <Button
                            label={
                              appointment.status === "NotDone"
                                ? "Cancel"
                                : "Delete"
                            }
                            size="small"
                            color="statusNotDone"
                            onClick={() => {
                              fetch(
                                "http://localhost:3001/deleteAppt?uid=" +
                                  appointment.ID
                              );
                              window.location.reload();
                            }}
                          />
                          <Button
                            label={
                              appointment.payment_status === "Paid"
                                ? "Paid"
                                : "Pay"
                            }
                            size="small"
                            color={
                              appointment.payment_status === "Paid"
                                ? "statusDone"
                                : "focus"
                            }
                            href={
                              appointment.payment_status === "Paid"
                                ? undefined
                                : `/PaymentPage/${appointment.ID}`
                            }
                            disabled={appointment.payment_status === "Paid"}
                          />
                        </Box>
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

export default PatientsViewAppointments;
