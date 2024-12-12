import React, { useState, useEffect } from "react";
import {
  Box,
  Grommet,
  Heading,
  Button,
  Select,
  FormField,
  Form,
  Text,
} from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#0055AA", // Blue color for the button
      focus: "#FFD700",
      background: "#F8F8F8",
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
};

const AssignDepartment = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/doctorsWithoutDepartments")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(() => setMessage("Error fetching doctors."));
    fetch("http://localhost:3001/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        setIsLoading(false);
      })
      .catch(() => setMessage("Error fetching departments."));
  }, []);

  const handleAssign = () => {
    if (!selectedDoctor || !selectedDepartment) {
      setMessage("Please select both a doctor and a department.");
      return;
    }

    fetch("http://localhost:3001/assignDepartment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorEmail: selectedDoctor.email,
        departmentId: selectedDepartment.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Department assigned successfully!");
          setDoctors(
            doctors.filter((doc) => doc.email !== selectedDoctor.email)
          );
          setSelectedDoctor(null);
          setSelectedDepartment(null);
        } else {
          setMessage("Failed to assign department.");
        }
      })
      .catch(() => setMessage("Error assigning department."));
  };

  return (
    <Grommet theme={theme}>
      <Box pad="medium" background="background" align="center" fill>
        <Heading level="3">Assign Departments to Doctors</Heading>
        <Box
          width="medium"
          background="white"
          pad="medium"
          round="small"
          elevation="medium"
          gap="small"
        >
          <Form>
            <FormField label="Select Doctor">
              <Select
                options={doctors}
                labelKey="name"
                valueKey="email"
                value={selectedDoctor}
                onChange={({ option }) => setSelectedDoctor(option)}
                placeholder="Select a doctor"
                disabled={isLoading}
              />
            </FormField>
            <FormField label="Select Department">
              <Select
                options={departments}
                labelKey="name"
                valueKey="id"
                value={selectedDepartment}
                onChange={({ option }) => setSelectedDepartment(option)}
                placeholder="Select a department"
                disabled={isLoading}
              />
            </FormField>
            <Box direction="row" gap="small" margin={{ top: "medium" }}>
              <Button
                label="Assign Department"
                onClick={handleAssign}
                primary
                disabled={isLoading}
                style={{ flex: 1 }}
              />
              <Button
                label="Back to Home"
                href="/AdminHome"
                style={{ flex: 1 }}
              />
            </Box>
          </Form>
          {message && (
            <Text color={message.includes("success") ? "green" : "red"}>
              {message}
            </Text>
          )}
        </Box>
      </Box>
    </Grommet>
  );
};

export default AssignDepartment;
