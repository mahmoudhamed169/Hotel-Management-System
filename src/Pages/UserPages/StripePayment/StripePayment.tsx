import { useState, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import img from "../../../assets/images/paymentSucess.png";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

export default function StripePaymentStepper() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentProcess />
    </Elements>
  );
}

const steps = ["Billing Address", "Payment Details", "Confirmation"];

const PaymentProcess = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [elementsLoaded, setElementsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cardElement = elements?.getElement("card");
    const addressElement = elements?.getElement("address");
    if (cardElement && addressElement) {
      setElementsLoaded(true);
    }
  }, [elements]);

  const handleNext = async (e: FormEvent) => {
    e.preventDefault();

    if (activeStep === 0) {
      const addressElement = elements?.getElement("address");
      const addressValue = await addressElement?.getValue();
      if (addressValue) setActiveStep(1);
    } else if (activeStep === 1) {
      const cardElement = elements?.getElement("card");
      const result = await stripe?.createToken(cardElement!);
      if (result?.token) {
        await handlePayment(result.token.id);
      }
    }
  };

  const handlePayment = async (token: string) => {
    const toastId = toast.loading("Processing...");
    setIsLoading(true);

    try {
      const response = await apiClient.post(
        `${PORTAL_URLS.payBooking}/${location.state.id}/pay`,
        {
          token,
        }
      );
      toast.success(response.data?.message, {
        id: toastId,
      });
      setActiveStep(2);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  return (
    <Paper
      component="form"
      onSubmit={handleNext}
      elevation={3}
      sx={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "40px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: "30px" }}>
        Payment Process
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          marginBottom: "40px",
          "& .MuiStepIcon-root": {
            height: "40px",
            width: "40px",
          },
          "& .MuiStepLabel-root .Mui-active": {
            color: "#1ABC9C",
          },
          "& .MuiStepLabel-root .Mui-completed": {
            color: "#1ABC9C",
          },
          "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
            color: "#1ABC9C",
          },
          "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
            color: "#1ABC9C",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box sx={{ marginBottom: "30px" }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "2rem",
              textAlign: "center",
              color: "#152C5B",
              fontSize: "3rem",
              fontWeight: "700",
            }}
          >
            Payment
            <Typography
              variant="h6"
              sx={{ marginBottom: "0.5rem", color: "#B0B0B0" }}
            >
              Kindly follow the instructions below
            </Typography>
          </Typography>
          <AddressElement options={{ mode: "billing" }} />
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ marginBottom: "30px" }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "2rem",
              textAlign: "center",
              color: "#152C5B",
              fontSize: "3rem",
              fontWeight: "700",
            }}
          >
            Payment
            <Typography
              variant="h6"
              sx={{ marginBottom: "0.5rem", color: "#B0B0B0" }}
            >
              Kindly follow the instructions below
            </Typography>
          </Typography>
          <Box
            sx={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardElement />
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            color="#152C5B"
            sx={{ color: "#152c5B", fontWeight: "700", fontSize: "2.5rem" }}
          >
            Yay! Completed
          </Typography>
          <img
            src={img}
            alt="payment sucess"
            style={{ marginTop: "20px", width: "300px" }}
          />
          <Typography
            variant="h6"
            color="#152C5B"
            sx={{
              fontWeight: "300",
              fontSize: "1rem",
              lineHeight: "1.5rem",
              color: "#B0B0B0",
              textAlign: "center",
            }}
          >
            We will inform you via email later <br /> once the transaction has
            been accepted
          </Typography>
          <Button
            onClick={() => {
              navigate("/home");
            }}
            variant="contained"
            color="primary"
            sx={{
              marginTop: "30px",
              backgroundColor: "#3252DF",
              width: "210px",
              height: "50px",
              borderRadius: "5px",
            }}
          >
            Go to Home
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
          gap: "20px",
        }}
      >
        {activeStep == 0 && (
          <Button
            onClick={() => {
              navigate(-1);
            }}
            sx={{
              width: "100%",
              backgroundColor: "#E0E0E0",
              height: "50px",
              color: "#333",
              "&:hover": {
                backgroundColor: "#C0C0C0",
              },
            }}
          >
            Cancel
          </Button>
        )}
        {activeStep > 0 && activeStep < 2 && (
          <Button
            onClick={handleBack}
            disabled={isLoading}
            sx={{
              width: "100%",
              backgroundColor: "#E0E0E0",
              height: "50px",
              color: "#333",
              "&:hover": {
                backgroundColor: "#C0C0C0",
              },
            }}
          >
            Back
          </Button>
        )}
        {activeStep < 2 && (
          <ButtonForm
            name={activeStep === 1 ? "Pay" : "Continue to Book"}
            isSubmitting={isLoading}
          />
        )}
      </Box>
    </Paper>
  );
};
