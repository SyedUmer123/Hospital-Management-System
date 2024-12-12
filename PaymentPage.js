import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Text, Grommet } from "grommet";
import { useParams, useNavigate } from "react-router-dom";

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

const PaymentPage = () => {
  const { id } = useParams(); // Get appointment ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [billingDetails, setBillingDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/getBillingDetails?appt_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBillingDetails(data);
      })
      .catch((err) => console.error("Error fetching billing details:", err));
  }, [id]);

  const handlePayment = () => {
    fetch(`http://localhost:3001/makePayment?appt_id=${id}`, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          setPaymentSuccess(true);
          setBillingDetails((prev) => ({
            ...prev,
            payment_status: "Paid",
          }));
        }
      })
      .catch((err) => console.error("Payment failed:", err));
  };

  if (!billingDetails) return <Text>Loading...</Text>;

  return (
    <Grommet theme={theme}>
      <Box align="center" justify="center" pad="large" background="background">
        <Box
          width="medium"
          pad="medium"
          background="white"
          round="small"
          elevation="small"
          style={{ border: "1px solid #E0E0E0" }}
        >
          {/* Bill Header */}
          <Box
            border={{ color: "light-3", size: "small", side: "bottom" }}
            pad="small"
          >
            <Heading level="3" textAlign="center" color="brand">
              HMS Billing Invoice
            </Heading>
            <Text textAlign="center" color="text">
              Invoice Number: #{billingDetails.appt_id}
            </Text>
            <Text textAlign="center" color="text">
              Date: {new Date().toLocaleDateString()}
            </Text>
          </Box>

          {/* Billing Details */}
          <Box pad={{ vertical: "medium" }}>
            <Heading level="4" color="brand" margin={{ bottom: "small" }}>
              Billing Details
            </Heading>
            <Text>Appointment ID: {billingDetails.appt_id}</Text>
            <Text>Patient: {billingDetails.patient_name || "N/A"}</Text>
            <Text>Doctor: {billingDetails.doctor_name || "N/A"}</Text>
          </Box>

          {/* Amount Details */}
          <Box
            pad="small"
            border={{ color: "light-3", size: "small", side: "top" }}
          >
            <Heading level="4" color="brand" margin={{ bottom: "small" }}>
              Amount Due
            </Heading>
            <Box direction="row" justify="between" margin={{ bottom: "small" }}>
              <Text>Service Fee:</Text>
              <Text>${Number(billingDetails.service_fee || 0).toFixed(2)}</Text>
            </Box>
            <Box direction="row" justify="between" margin={{ bottom: "small" }}>
              <Text>Additional Charges:</Text>
              <Text>
                ${Number(billingDetails.additional_charges || 0).toFixed(2)}
              </Text>
            </Box>
            <Box direction="row" justify="between" margin={{ bottom: "small" }}>
              <Text>Total Cost:</Text>
              <Text>
                <strong>${Number(billingDetails.total_cost).toFixed(2)}</strong>
              </Text>
            </Box>
          </Box>

          {/* Payment Status */}
          <Box pad={{ vertical: "medium" }}>
            <Text>
              Payment Status:{" "}
              <strong
                style={{
                  color:
                    billingDetails.payment_status === "Paid"
                      ? "green"
                      : billingDetails.payment_status === "Pending"
                      ? "orange"
                      : "red",
                }}
              >
                {billingDetails.payment_status}
              </strong>
            </Text>
            {paymentSuccess && (
              <Text color="green" margin={{ top: "small" }}>
                Payment Successful!
              </Text>
            )}
          </Box>

          {/* Action Buttons */}
          <Box direction="row" justify="between" margin={{ top: "medium" }}>
            <Button
              label="Back"
              onClick={() => navigate(-1)} // Go to the previous page
              margin={{ top: "medium" }}
            />
            {billingDetails.payment_status === "Pending" && (
              <Button
                label="Pay Now"
                onClick={handlePayment}
                primary
                margin={{ top: "medium" }}
                color="brand"
                style={{ color: "white" }} // White text for the button
              />
            )}
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

export default PaymentPage;
