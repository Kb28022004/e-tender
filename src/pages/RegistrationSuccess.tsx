import React, { useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  margin: "200px auto",
  padding: theme.spacing(6),
  textAlign: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: 60,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
}));

const RegistrationSuccess = ({setShowPaymentPage,setShowDetails,setshowSuccessPage}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setLoading(true);
    setTimeout(() => {
      
      setLoading(false);
      setshowSuccessPage(false)
      setShowDetails(false)
     setShowPaymentPage(true)
    }, 2000);
  };

  return (
    <Container>
      <SuccessIcon />
      <Typography variant="h5" gutterBottom>
        You have successfully registered!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Please proceed to complete your payment.
      </Typography>

      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleProceed}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Redirecting..." : "Proceed with Payment"}
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationSuccess;
