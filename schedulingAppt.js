import React, { Component, useState, useEffect } from "react";
import { Schedule } from "grommet-icons";
import {
  Box,
  Button,
  Heading,
  Form,
  Text,
  TextArea,
  Grommet,
  Calendar,
  DropButton,
  MaskedInput,
  Keyboard,
  Select,
} from "grommet";
import "./App.css";

const theme = {
  global: {
    colors: {
      brand: "#0077CC", // This is used for the button and other branded elements
      focus: "#FFD700",
      active: "#0055AA",
      text: {
        light: "#444444",
        dark: "#FFFFFF",
      },
      border: "#CCCCCC",
      control: "#0077CC", // Matches brand color for buttons
      background: "#F5F5F5",
    },
    font: {
      family: "Roboto, Arial, sans-serif",
      size: "18px",
      height: "20px",
    },
    hover: {
      background: {
        color: "#E0E0E0",
        opacity: "strong",
      },
    },
  },
  button: {
    primary: {
      color: "brand", // Sets the primary button color to brand
    },
    border: {
      radius: "8px",
    },
    hover: {
      border: {
        color: "brand",
      },
    },
  },
  textArea: {
    extend: "border-radius: 8px; padding: 8px;",
  },
  select: {
    control: {
      extend: "border-radius: 8px;",
    },
  },
  calendar: {
    day: {
      extend: "border-radius: 50%;",
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
    pad={{ horizontal: "medium", vertical: "small" }}
    style={{ zIndex: "1", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
    {...props}
  />
);

const CustomCalendar = ({ date, onSelect }) => (
  <Calendar
    date={date}
    onSelect={onSelect}
    showAdjacentDays={false}
    locale="en-US"
    daysOfWeek // Enables display of days (custom formatting applied below)
    firstDayOfWeek={1} // Monday as the first day
    format={({ date }) => {
      const dayFormat = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      });
      return dayFormat.format(date).charAt(0).toUpperCase(); // Format as M, T, W, etc.
    }}
    style={{ border: "1px solid #CCCCCC", borderRadius: "8px" }}
  />
);

const DropContent = ({ date: initialDate, time: initialTime, onClose }) => {
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  const close = () => {
    if (date && time) {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        window.alert(
          "The selected date cannot be in the past. Please choose a valid date."
        );
        return;
      }

      const [startHour, startMin] = time.split(":").map(Number);
      const endHour = startHour + 1; // Add one hour
      const endTime = `${endHour < 10 ? "0" : ""}${endHour}:${
        startMin < 10 ? "0" : ""
      }${startMin}`;
      onClose(date, time, endTime);
    }
  };

  return (
    <Box align="center" pad="medium" gap="small">
      <CustomCalendar date={date} onSelect={setDate} />
      <Box pad="small" gap="small">
        <Keyboard onEnter={close}>
          <MaskedInput
            mask={[
              {
                length: [1, 2],
                options: Array.from({ length: 24 }, (_, i) => `${i}`),
                placeholder: "hh",
              },
              { fixed: ":" },
              { length: 2, options: ["00"], placeholder: "mm" },
            ]}
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </Keyboard>
        <Button label="Done" onClick={close} primary />
      </Box>
    </Box>
  );
};

const DateTimeDropButton = ({ onDateTimeChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleClose = (newDate, newTime, endTime) => {
    setDate(newDate);
    setTime(newTime);
    setOpen(false);
    onDateTimeChange({ date: newDate, time: newTime, endTime });
  };

  return (
    <DropButton
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dropContent={
        <DropContent date={date} time={time} onClose={handleClose} />
      }
    >
      <Box
        direction="row"
        align="center"
        pad="small"
        gap="small"
        background="light-1"
        style={{
          borderRadius: "8px",
          border: "1px solid #CCCCCC",
        }}
      >
        <Text color={date ? undefined : "dark-5"}>
          {date
            ? `${new Date(date).toLocaleDateString()} ${time}`
            : "Select Date & Time"}
        </Text>
        <Schedule />
      </Box>
    </DropButton>
  );
};

const ConcernsTextArea = ({ onChange }) => (
  <TextArea
    placeholder="Enter your concerns..."
    onChange={onChange}
    fill
    style={{ border: "1px solid #CCCCCC", borderRadius: "8px" }}
  />
);

const SymptomsTextArea = ({ onChange }) => (
  <TextArea
    placeholder="Enter your symptoms..."
    onChange={onChange}
    fill
    style={{ border: "1px solid #CCCCCC", borderRadius: "8px" }}
  />
);

const DoctorsDropdown = ({ onDoctorChange }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/docInfo")
      .then((res) => res.json())
      .then((res) => {
        const doctorOptions = res.data.map(
          (doc) => `${doc.name} (${doc.email})`
        );
        setDoctorsList(doctorOptions);
      });
  }, []);

  const handleChange = ({ value }) => {
    setSelectedDoctor(value);
    const doctorEmail = value.match(/\((.*)\)/)[1];
    onDoctorChange(doctorEmail);
  };

  return (
    <Select
      options={doctorsList}
      value={selectedDoctor}
      placeholder="Select a Doctor"
      onChange={handleChange}
      required
    />
  );
};

export class SchedulingAppt extends Component {
  state = {
    date: "",
    time: "",
    endTime: "",
    doctorEmail: "",
    concerns: "",
    symptoms: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { date, time, endTime, doctorEmail, concerns, symptoms } = this.state;

    fetch("http://localhost:3001/userInSession")
      .then((res) => res.json())
      .then(({ email }) => {
        fetch(
          `http://localhost:3001/checkIfApptExists?email=${email}&startTime=${time}&date=${date}&docEmail=${doctorEmail}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.data[0]) {
              window.alert(
                "Appointment Clash! Try another doctor or date/time"
              );
            } else {
              fetch("http://localhost:3001/genApptUID")
                .then((res) => res.json())
                .then(({ id }) => {
                  fetch(
                    `http://localhost:3001/schedule?time=${time}&endTime=${endTime}&date=${date}&concerns=${concerns}&symptoms=${symptoms}&id=${id}&doc=${doctorEmail}`
                  ).then(() =>
                    fetch(
                      `http://localhost:3001/addToPatientSeeAppt?email=${email}&id=${id}&concerns=${concerns}&symptoms=${symptoms}`
                    ).then(() =>
                      window.alert("Appointment successfully scheduled!")
                    )
                  );
                });
            }
          });
      });
  };

  render() {
    return (
      <Grommet theme={theme} full>
        <AppBar>
          <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
            <Heading level="3" margin="none" color="focus">
              HMS
            </Heading>
          </a>
        </AppBar>
        <Box align="center" pad="large" background="background">
          <Form
            onSubmit={this.handleFormSubmit}
            style={{
              maxWidth: "700px", // Increased max width
              width: "100%",
              padding: "32px", // Increased padding for spacious layout
              borderRadius: "16px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box gap="medium">
              <DoctorsDropdown
                onDoctorChange={(doctorEmail) => this.setState({ doctorEmail })}
              />
              <DateTimeDropButton
                onDateTimeChange={({ date, time, endTime }) =>
                  this.setState({ date, time, endTime })
                }
              />
              <ConcernsTextArea
                onChange={(event) =>
                  this.setState({ concerns: event.target.value })
                }
              />
              <SymptomsTextArea
                onChange={(event) =>
                  this.setState({ symptoms: event.target.value })
                }
              />
            </Box>
            <Box pad={{ top: "medium" }}>
              <Button
                label="Schedule Appointment"
                type="submit"
                primary
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Form>
        </Box>
      </Grommet>
    );
  }
}

export default SchedulingAppt;
