import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  AddressElement,
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Box, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { CoPresentOutlined } from "@mui/icons-material";
export default function StripePayment() {
  const stripe = loadStripe(
    "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
  );

  return (
    <Elements stripe={stripe}>
      <Form />
    </Elements>
  );
}

const Form = () => {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [elementsLoaded, setElementsLoaded] = useState(false);
  const pay = async (id: string, token: string) => {
    const toastId = toast.loading("Processing...");

    setIsLoading(true);
    try {
      const response = await apiClient.post(
        `${PORTAL_URLS.payBooking}/${id}/pay`,
        {
          token,
        }
      );
      console.log(response.data?.message);
      toast.success(response.data?.message, {
        id: toastId,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError);
      toast.error(axiosError.response.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  useEffect(() => {
    const cardElement = elements?.getElement("card");
    const addressElement = elements?.getElement("address");
    if (cardElement && addressElement) {
      setElementsLoaded(true);
    }
  }, [elements]);
  const handleSumbit = async (e: FormEvent) => {
    console.log(e);
    e.preventDefault();
    if (!elements || !stripe) return;
    const cardElement = elements.getElement("card");
    const adressElement = elements.getElement("address");

    if (!cardElement || !adressElement) return;

    const result = await stripe.createToken(cardElement);
    const adressValue = await adressElement.getValue();

    pay(location.state.id, result.token.id);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSumbit}
      sx={{
        width: "50%",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Payment Details
      </Typography>
      <Box
        sx={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "4px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}>
        <CardElement />
      </Box>
      <AddressElement options={{ mode: "billing" }} />
      <Box sx={{ marginTop: "30px" }}>
        {elementsLoaded && <ButtonForm name="Pay" isSubmitting={isLoading} />}
      </Box>
    </Box>
  );
};
