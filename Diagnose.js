import React, { useState } from "react";
import { Box, Button, Heading, Form, TextArea, Grommet, Text } from "grommet";
import { useParams } from "react-router-dom";

const theme = {
  global: {
    colors: {
      brand: "#0055AA",
      focus: "#FFD700",
      text: "#333333",
      background: "#F8F8F8",
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
    style={{ borderBottom: "2px solid #FFD700", zIndex: 1 }}
    {...props}
  >
    <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
      <Heading level="3" margin="none" color="#FFD700">
        HMS
      </Heading>
    </a>
  </Box>
);

const Diagnose = () => {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleDiagnosisChange = (event) => {
    setDiagnosis(event.target.value);
  };

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `http://localhost:3001/diagnose?diagnosis=${diagnosis}&prescription=${prescription}&id=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit diagnosis");
        }
        return response.json();
      })
      .then((data) => {
        window.alert(data.message); // Display success message
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("An error occurred while submitting the diagnosis."); // Display error message
      });
  };

  return (
    <Grommet theme={theme} full>
      <AppBar />
      <Box
        fill
        align="center"
        justify="center"
        pad="large"
        background="background"
      >
        <Box
          width="large" // Increased width for better usability
          pad="large"
          background="white"
          round="small"
          elevation="medium"
          style={{
            border: "1px solid #E0E0E0",
          }}
        >
          <Heading level="3" margin={{ bottom: "medium" }} alignSelf="center">
            Patient Diagnosis
          </Heading>
          <Form onSubmit={handleSubmit}>
            <Box gap="medium">
              {/* Diagnosis Field */}
              <Box>
                <Text weight="bold" margin={{ bottom: "small" }}>
                  Diagnosis
                </Text>
                <TextArea
                  placeholder="Enter diagnosis details here..."
                  value={diagnosis}
                  onChange={handleDiagnosisChange}
                  style={{
                    height: "120px",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                  focusIndicator
                  required
                />
              </Box>

              {/* Prescription Field */}
              <Box>
                <Text weight="bold" margin={{ bottom: "small" }}>
                  Prescription
                </Text>
                <TextArea
                  placeholder="Enter prescription details here..."
                  value={prescription}
                  onChange={handlePrescriptionChange}
                  style={{
                    height: "120px",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                  focusIndicator
                  required
                />
              </Box>

              {/* Submit Button */}
              <Box align="center" margin={{ top: "medium" }}>
                <Button
                  label="Submit Diagnosis"
                  type="submit"
                  primary
                  style={{
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    backgroundColor: "#0055AA",
                    color: "#FFF",
                  }}
                  hoverIndicator={{ background: "#003E80" }}
                />
              </Box>
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default Diagnose;
