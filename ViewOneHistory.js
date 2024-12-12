import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "grommet";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // Main theme color
      focus: "#FFD700",
      background: "#f5f5f5",
      lightGray: "#eeeeee",
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
};

const ViewOneHistory = () => {
  const [medhiststate, setMedHistState] = useState([]);
  const [medhiststate2, setMedHistState2] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    if (email) {
      getHistory(email);
      allDiagnoses(email);
    }
  }, [email]);

  const getHistory = (email) => {
    fetch(`http://localhost:3001/OneHistory?patientEmail='${email}'`)
      .then((res) => res.json())
      .then((res) => setMedHistState(res.data));
  };

  const allDiagnoses = (email) => {
    fetch(`http://localhost:3001/allDiagnoses?patientEmail='${email}'`)
      .then((res) => res.json())
      .then((res) => setMedHistState2(res.data));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 10; // Start y-coordinate for the content

    // Add title
    doc.setFontSize(16);
    doc.text("Medical History and Diagnoses", 10, yPosition);
    yPosition += 10; // Increment y-position for next content

    // Medical History Section
    medhiststate.forEach((patient, idx) => {
      if (yPosition > 280) {
        // Check if we are near the page bottom
        doc.addPage(); // Add a new page
        yPosition = 10; // Reset y-position for new page
      }

      doc.setFontSize(14);
      doc.text(`Patient ${idx + 1}`, 10, yPosition);
      yPosition += 8;

      doc.setFontSize(12);
      doc.text(`Name: ${patient.name}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Email: ${patient.email}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Gender: ${patient.gender}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Address: ${patient.address}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Conditions: ${patient.conditions}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Surgeries: ${patient.surgeries}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Medications: ${patient.medication}`, 10, yPosition);
      yPosition += 10; // Add some spacing after each patient
    });

    // Diagnoses Section
    doc.addPage(); // Start diagnoses on a new page
    yPosition = 10; // Reset y-position
    doc.setFontSize(16);
    doc.text("Diagnoses", 10, yPosition);
    yPosition += 10;

    medhiststate2.forEach((patient, idx) => {
      if (yPosition > 280) {
        // Check if we are near the page bottom
        doc.addPage(); // Add a new page
        yPosition = 10; // Reset y-position for new page
      }

      doc.setFontSize(14);
      doc.text(`Diagnosis ${idx + 1}`, 10, yPosition);
      yPosition += 8;

      doc.setFontSize(12);
      doc.text(`Date: ${patient.date.split("T")[0]}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Doctor: ${patient.doctor}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Concerns: ${patient.concerns}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Symptoms: ${patient.symptoms}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Diagnosis: ${patient.diagnosis}`, 10, yPosition);
      yPosition += 6;
      doc.text(`Prescription: ${patient.prescription}`, 10, yPosition);
      yPosition += 10; // Add some spacing after each diagnosis
    });

    // Save the PDF
    doc.save("Medical_History_and_Diagnoses.pdf");
  };

  return (
    <Grommet full={true} theme={theme}>
      <Box fill background="background">
        {/* Header */}
        <Box
          tag="header"
          background="brand"
          pad="medium"
          elevation="small"
          direction="row"
          align="center"
          justify="center"
        >
          <Heading level="3" margin="none">
            <a href="/" style={{ textDecoration: "none", color: "#FFD700" }}>
              HMS
            </a>
          </Heading>
        </Box>

        {/* Medical History Section */}
        <Box pad="medium">
          <Card margin={{ bottom: "medium" }} background="lightGray">
            <CardHeader
              pad="small"
              background="brand"
              align="center"
              justify="center"
            >
              <Heading level="4" color="focus" margin="none" textAlign="center">
                Medical History
              </Heading>
            </CardHeader>
            <CardBody
              pad="small"
              style={{ overflow: "auto", maxHeight: "600px" }}
            >
              {medhiststate.map((patient) => (
                <Table key={patient.email} margin={{ bottom: "medium" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell scope="row" style={{ minWidth: "120px" }}>
                        <Text weight="bold">Name</Text>
                      </TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell />
                      <TableCell style={{ minWidth: "120px" }}>
                        <Text weight="bold">Email</Text>
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ minWidth: "120px" }}>
                        <Text weight="bold">Gender</Text>
                      </TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell />
                      <TableCell style={{ minWidth: "120px" }}>
                        <Text weight="bold">Address</Text>
                      </TableCell>
                      <TableCell>{patient.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ minWidth: "120px" }}>
                        <Text weight="bold">Conditions</Text>
                      </TableCell>
                      <TableCell colSpan={4}>{patient.conditions}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ minWidth: "120px" }}>
                        <Text weight="bold">Surgeries</Text>
                      </TableCell>
                      <TableCell colSpan={4}>{patient.surgeries}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ minWidth: "120px" }}>
                        <Text weight="bold">Medications</Text>
                      </TableCell>
                      <TableCell colSpan={4}>{patient.medication}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))}
            </CardBody>
          </Card>

          {/* Diagnoses Section */}
          <Card background="lightGray">
            <CardHeader
              pad="small"
              background="brand"
              align="center"
              justify="center"
            >
              <Heading level="4" color="focus" margin="none" textAlign="center">
                Diagnoses
              </Heading>
            </CardHeader>
            <CardBody
              pad="small"
              style={{
                overflow: "auto",
                maxHeight: "500px", // Scrollable diagnoses section
              }}
            >
              <Table style={{ width: "100%" }}>
                <TableBody>
                  {medhiststate2.map((patient) => (
                    <React.Fragment key={patient.id}>
                      <TableRow>
                        <TableCell
                          scope="row"
                          style={{
                            padding: "8px",
                            minWidth: "120px",
                            fontWeight: "bold",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell style={{ padding: "8px" }}>
                          {patient.date.split("T")[0]}
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "8px",
                            minWidth: "120px",
                            fontWeight: "bold",
                          }}
                        >
                          Doctor
                        </TableCell>
                        <TableCell style={{ padding: "8px" }}>
                          {patient.doctor}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          scope="row"
                          style={{
                            padding: "8px",
                            minWidth: "120px",
                            fontWeight: "bold",
                          }}
                        >
                          Concerns
                        </TableCell>
                        <TableCell style={{ padding: "8px" }}>
                          {patient.concerns}
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "8px",
                            minWidth: "120px",
                            fontWeight: "bold",
                          }}
                        >
                          Symptoms
                        </TableCell>
                        <TableCell style={{ padding: "8px" }}>
                          {patient.symptoms}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          scope="row"
                          style={{
                            padding: "8px",
                            minWidth: "120px",
                            fontWeight: "bold",
                          }}
                        >
                          Diagnosis
                        </TableCell>
                        <TableCell colSpan={3} style={{ padding: "8px" }}>
                          {patient.diagnosis}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          scope="row"
                          style={{
                            padding: "8px",
                            minWidth: "120px",
                            fontWeight: "bold",
                          }}
                        >
                          Prescription
                        </TableCell>
                        <TableCell colSpan={3} style={{ padding: "8px" }}>
                          {patient.prescription}
                        </TableCell>
                      </TableRow>
                      {/* Separator Row for Spacing */}
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          style={{ padding: "8px", backgroundColor: "#f0f0f0" }}
                        />
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
          <Box align="center" margin={{ top: "medium" }}>
            <Button label="Download as PDF" onClick={generatePDF} primary />
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

export default ViewOneHistory;
