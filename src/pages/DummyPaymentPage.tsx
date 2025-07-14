import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,

  Grid,

} from "@mui/material";
import { styled } from "@mui/material/styles";

import toast from "react-hot-toast";

// ✅ Styled Container
const Container = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  margin: "200px auto",
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: "#fff",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
  },
}));

const DummyPaymentPage = ({setShowPaymentPage,setShowDetails}) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake validation
    if (
      formData.cardNumber &&
      formData.expiry &&
      formData.cvc &&
      formData.name
    ) {
      toast.success("🎉 Payment successful!");
      setFormData({
        cardNumber:"",
        expiry:"",
        cvc:"",
        name:""
      })
      setShowPaymentPage(false)
      setShowDetails(true)
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <Container elevation={3}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Payment Details
      </Typography>

      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        This is a dummy Stripe-style payment form.
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Card Number */}
        <Box mb={3}>
          <TextField
            label="Card Number"
            name="cardNumber"
            fullWidth
            variant="outlined"
            required
            placeholder="4242 4242 4242 4242"
            value={formData.cardNumber}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Expiry and CVC */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={6}>
            <TextField
              label="Expiry"
              name="expiry"
              fullWidth
              variant="outlined"
              required
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVC"
              name="cvc"
              fullWidth
              variant="outlined"
              required
              placeholder="123"
              value={formData.cvc}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Name on Card */}
        <Box mb={4}>
          <TextField
            label="Name on Card"
            name="name"
            fullWidth
            variant="outlined"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            py: 1.5,
            backgroundColor: "#635BFF",
            "&:hover": {
              backgroundColor: "#5347ff",
            },
          }}
        >
          Pay ₹999
        </Button>
      </form>
    </Container>
  );
};

export default DummyPaymentPage;
