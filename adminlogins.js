import React, { useState, useEffect } from "react";
import { Box, Heading, DataTable, Grommet } from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#0055AA",
      background: "#F8F8F8",
      text: "#000000",
    },
    font: {
      family: "Arial, sans-serif",
    },
  },
};

// Reusable Header component (from AdminHome)
const Header = () => (
  <Box
    tag="header"
    background="brand"
    pad={{ vertical: "small", horizontal: "medium" }}
    elevation="small"
    justify="center" // Center the content horizontally
    align="center" // Center the content vertically
    direction="row"
    flex={false}
    width="100%" // Make the header take up the full width
    style={{ borderBottom: "1px solid grey" }}
  >
    <a style={{ color: "#FFD700", textDecoration: "inherit" }} href="/">
      <Heading level="3" margin="none" color="#FFD700">
        HMS
      </Heading>
    </a>
  </Box>
);

const AdminLoginLogs = () => {
  const [logs, setLogs] = useState([]);

  // Fetch the login logs when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/getLoginLogs")
      .then((res) => res.json())
      .then((data) => {
        // Format the logs into separate date and time columns
        const formattedLogs = data.map((log) => {
          const loginTime = new Date(log.login_time);
          return {
            user_email: log.user_email,
            user_role: log.user_role,
            date: loginTime.toLocaleDateString(),
            time: loginTime.toLocaleTimeString(),
          };
        });
        setLogs(formattedLogs);
      })
      .catch((error) => console.error("Error fetching login logs:", error));
  }, []);

  // Define columns for the DataTable
  const columns = [
    { property: "user_email", header: "User Email" },
    { property: "user_role", header: "Role" },
    { property: "date", header: "Date" },
    { property: "time", header: "Time" },
  ];

  return (
    <Grommet theme={theme}>
      <Box fill>
        {/* Add the HMS bar here */}
        <Header />

        <Box
          fill
          align="center"
          justify="center"
          pad={{ vertical: "medium", horizontal: "large" }}
          background="background"
        >
          <Box
            width="xlarge" // Increase width for a more spacious table
            pad="large" // Add padding around the box
            background="white"
            round="small"
            elevation="medium"
            gap="medium" // Add gap between header and table
            overflow="auto" // Ensure content is scrollable if it overflows
          >
            <Heading level="3" margin="none">
              Login Logs
            </Heading>
            <Box overflow="auto" width="100%">
              <DataTable
                columns={columns}
                data={logs}
                step={10} // Pagination step
                resizeable
                pad="small" // Add padding to the table cells
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

export default AdminLoginLogs;
