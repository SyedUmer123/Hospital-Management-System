import React, { useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Grommet,
  TextInput,
  Select,
} from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#0055AA",
      focus: "#FFD700",
      background: "#F8F8F8",
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
};

const AddSchedule = () => {
  const [formData, setFormData] = useState({
    id: "",
    starttime: "",
    endtime: "",
    breaktime: "",
    day: "",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/addSchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Schedule added successfully!");
          setFormData({
            id: "",
            starttime: "",
            endtime: "",
            breaktime: "",
            day: "",
          });
        } else {
          alert("Error adding schedule: " + data.error);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <Grommet theme={theme} full>
      <Box
        fill
        align="center"
        justify="top"
        pad="medium"
        background="background"
      >
        <Box
          width="medium"
          pad="medium"
          background="white"
          round="small"
          elevation="small"
        >
          <Form onSubmit={handleSubmit}>
            <FormField label="ID" name="id" required>
              <TextInput
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter ID"
              />
            </FormField>
            <FormField label="Start Time" name="starttime" required>
              <TextInput
                name="starttime"
                value={formData.starttime}
                onChange={handleChange}
                placeholder="HH:MM:SS"
              />
            </FormField>
            <FormField label="End Time" name="endtime" required>
              <TextInput
                name="endtime"
                value={formData.endtime}
                onChange={handleChange}
                placeholder="HH:MM:SS"
              />
            </FormField>
            <FormField label="Break Time" name="breaktime" required>
              <TextInput
                name="breaktime"
                value={formData.breaktime}
                onChange={handleChange}
                placeholder="HH:MM:SS"
              />
            </FormField>
            <FormField label="Day" name="day" required>
              <Select
                name="day"
                options={days}
                value={formData.day}
                onChange={({ option }) =>
                  setFormData({ ...formData, day: option })
                }
              />
            </FormField>
            <Box direction="row" gap="small" margin={{ top: "medium" }}>
              <Button type="submit" label="Add Schedule" primary />
              <Button label="Back to Home" href="/AdminHome" />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default AddSchedule;
