import React, { useState, useEffect } from "react";
import {
  Grommet,
  Box,
  Heading,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text,
  Spinner,
  Select,
  TextInput,
  Button,
} from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#0055AA",
      focus: "#FFD700",
      background: "#f9f9f9",
      border: "#DADADA",
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
    pad="medium"
    elevation="medium"
    {...props}
  >
    <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
      <Heading level="3" margin="none" color="focus">
        HMS
      </Heading>
    </a>
  </Box>
);

const DoctorSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filters
  const [selectedDay, setSelectedDay] = useState("");
  const [startTimeFilter, setStartTimeFilter] = useState("");
  const [endTimeFilter, setEndTimeFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/doctorSchedule")
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredSchedules = schedules.filter((schedule) => {
    const startTime = new Date(schedule.starttime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(schedule.endtime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      (selectedDay === "" || schedule.day === selectedDay) &&
      (startTimeFilter === "" || startTime >= startTimeFilter) &&
      (endTimeFilter === "" || endTime <= endTimeFilter)
    );
  });

  return (
    <Grommet theme={theme} full>
      <Box fill background="background">
        <AppBar />
        <Box pad="medium" gap="medium">
          <Heading level="4" color="brand">
            Doctor Schedules
          </Heading>

          {/* Filters Section */}
          <Box direction="row" gap="medium" align="center">
            {/* Day Filter */}
            <Select
              options={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
              placeholder="Filter by Day"
              value={selectedDay}
              onChange={({ option }) => setSelectedDay(option)}
            />
            {/* Time Filters */}
            <TextInput
              placeholder="Start Time (HH:MM AM/PM)"
              value={startTimeFilter}
              onChange={(event) => setStartTimeFilter(event.target.value)}
            />
            <TextInput
              placeholder="End Time (HH:MM AM/PM)"
              value={endTimeFilter}
              onChange={(event) => setEndTimeFilter(event.target.value)}
            />
            {/* Clear Filters */}
            <Button
              label="Clear Filters"
              onClick={() => {
                setSelectedDay("");
                setStartTimeFilter("");
                setEndTimeFilter("");
              }}
            />
          </Box>

          {loading ? (
            <Box align="center" pad="large">
              <Spinner size="medium" />
              <Text>Loading schedules...</Text>
            </Box>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    <Text weight="bold">Doctor Name</Text>
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    <Text weight="bold">Day</Text>
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    <Text weight="bold">Start Time</Text>
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    <Text weight="bold">End Time</Text>
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    <Text weight="bold">Break Time</Text>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Text>{schedule.doctor_name}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{schedule.day}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {new Date(schedule.starttime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {new Date(schedule.endtime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {new Date(schedule.breaktime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Grommet>
  );
};

export default DoctorSchedule;
