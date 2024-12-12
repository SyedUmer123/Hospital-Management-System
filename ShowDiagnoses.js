import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardBody,
  CardHeader,
  Text,
} from "grommet";
import { useParams } from "react-router-dom"; // Use the useParams hook to access route parameters
import "./App.css";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // High-contrast blue
      focus: "#FFD700",
      background: "#F9F9F9",
      border: "#DADADA",
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
};

const ShowDiagnoses = () => {
  const { id } = useParams(); // Access the 'id' from the route parameters using the useParams hook
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/showDiagnoses?id=${id}`)
      .then((res) => res.json())
      .then((res) => setDiagnoses(res.data))
      .catch((error) => console.error("Error fetching diagnoses:", error));
  }, [id]); // Re-fetch when the id changes

  const Header = () => (
    <Box
      tag="header"
      background="brand"
      pad="small"
      elevation="small"
      justify="center"
      direction="row"
      align="center"
      flex={false}
    >
      <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
        <Heading level="3" margin="none" color="focus">
          HMS
        </Heading>
      </a>
    </Box>
  );

  const Body = () => (
    <Box pad="medium" gap="medium">
      {diagnoses.length === 0 ? (
        <Box align="center" pad="large">
          <Text size="large" color="dark-6">
            No diagnoses found for this appointment.
          </Text>
        </Box>
      ) : (
        diagnoses.map((diagnosis, index) => (
          <Card
            key={index}
            elevation="small"
            background="light-1"
            border={{ color: "border", size: "small" }}
            pad="medium"
            round="small"
          >
            <CardHeader pad="small" background="light-2" round="small">
              <Heading level="4" margin="none" color="brand">
                Appointment ID: {diagnosis.appt}
              </Heading>
            </CardHeader>
            <CardBody pad="medium" gap="small">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell scope="row" border="bottom">
                      <Text weight="bold">Doctor</Text>
                    </TableCell>
                    <TableCell border="bottom">
                      <Text>{diagnosis.doctor}</Text>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row" border="bottom">
                      <Text weight="bold">Diagnosis</Text>
                    </TableCell>
                    <TableCell border="bottom">
                      <Text>{diagnosis.diagnosis}</Text>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row" border="bottom">
                      <Text weight="bold">Prescription</Text>
                    </TableCell>
                    <TableCell border="bottom">
                      <Text>{diagnosis.prescription}</Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        ))
      )}
    </Box>
  );

  return (
    <Grommet full={true} theme={theme}>
      <Box fill={true}>
        <Header />
        <Body />
      </Box>
    </Grommet>
  );
};

export default ShowDiagnoses;
