import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import DateRangeSelector from "./../DateRangeSelector/DateRangeSelector";
import CapacitySelector from "./../CapacitySelector/CapacitySelector";
import ButtonForm from "../../SharedComponents/ButtonForm/ButtonForm";
import LoginModal from "../LoginModal/LoginModal";
import toast from "react-hot-toast";
import { apiClient } from "../../../Api/END_POINTS";
import { useNavigate } from "react-router-dom";

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
}

interface BookingFormProps {
  room: Room;
}
interface BookingResponse {
  message: string;
}

function BookingForm({ room }: BookingFormProps) {
  const [finalPrice, setFinalPrice] = useState(room.price);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateRange: { startDate: null, endDate: null },
      capacity: 1,
    },
  });
  const dateRange = watch("dateRange");
  const capacity = watch("capacity");

  useEffect(() => {
    const discountFactor = room.discount / 100;
    const pricePerPerson = room.price;
    const totalPrice = pricePerPerson * capacity * (1 - discountFactor);
    setFinalPrice(totalPrice);
  }, [capacity, room.price, room.discount]);

  const handleConfirmBooking = async (data: any) => {
    const bookingDetails = {
      room: room._id,
      startDate: data.dateRange.startDate,
      endDate: data.dateRange.endDate,
      totalPrice: finalPrice,
    };

    console.log(bookingDetails);
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const toastId = toast.loading("Processing...");
    if (!isLoggedIn) {
      toast.error("Please log in to access this feature..", {
        id: toastId,
      });
      handleOpenModal();
    } else {
      try {
        const response = await apiClient.post<BookingResponse>(
          "/portal/booking",
          bookingDetails
        );

        toast.success(response.data.message, {
          id: toastId,
        });
        console.log(response);
        navigate("/stripePayment", {
          state: { id: response.data.data.booking._id },
        });
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || "An error occurred", {
          id: toastId,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        border: "1px solid #E0E0E0",
        borderRadius: "8px",
        width: "487px",
      }}>
      <LoginModal show={isModalOpen} handleClose={handleCloseModal} />
      <Box sx={{ width: "75%", margin: "auto" }}>
        <Typography
          variant="h6"
          sx={{
            marginTop: "4.5rem",
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "1rem",
            color: "#152C5B",
          }}>
          Start Booking
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginTop: "1rem",
            fontWeight: "500",
            fontSize: "2.5rem",
            lineHeight: "1rem",
            color: "#B0B0B0",
          }}>
          <Typography
            component={"span"}
            sx={{ fontSize: "2.5rem", color: "#1ABC9C", mr: "0.5rem" }}>
            ${room.price}
          </Typography>
          per night
        </Typography>

        <Typography
          variant="body2"
          sx={{
            marginTop: "0.3rem",
            fontWeight: "600",
            fontSize: "1rem",
            lineHeight: "1.rem",
            color: "#FF1612",
          }}>
          Discount {room.discount}% Off
        </Typography>

        <Box
          sx={{ marginTop: "6.5rem" }}
          component={"form"}
          onSubmit={handleSubmit(handleConfirmBooking)}>
          <Typography sx={{ color: "#152C5B", fontWeight: "600" }}>
            Pick a Date
          </Typography>
          <Controller
            name="dateRange"
            control={control}
            rules={{
              required: "Date range is required.",
              validate: (value) =>
                (value.startDate && value.endDate) ||
                "Please select both start and end dates.",
            }}
            render={({ field }) => (
              <>
                <DateRangeSelector onDateChange={field.onChange} />
                {errors.dateRange && (
                  <Typography sx={{ color: "red" }}>
                    {errors.dateRange.message}
                  </Typography>
                )}
              </>
            )}
          />

          <Typography
            sx={{ color: "#152C5B", fontWeight: "600", marginTop: "1.5rem" }}>
            Capacity
          </Typography>
          <Controller
            name="capacity"
            control={control}
            rules={{
              required: "Capacity is required.",
              min: { value: 1, message: "Capacity must be at least 1." },
              max: {
                value: room.capacity,
                message: `Capacity cannot exceed ${room.capacity}.`,
              },
            }}
            render={({ field }) => (
              <>
                <CapacitySelector
                  onCountChange={field.onChange}
                  maxCapacity={room.capacity}
                />
                {errors.capacity && (
                  <Typography sx={{ color: "red" }}>
                    {errors.capacity.message}
                  </Typography>
                )}
              </>
            )}
          />

          <Box sx={{ marginTop: "1.5rem" }}>
            <Typography
              sx={{
                marginTop: "1rem",
                fontWeight: "400",
                fontSize: "1rem",
                color: "#B0B0B0",
              }}>
              You will pay{" "}
              <Typography
                component={"span"}
                sx={{
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  color: "#152C5B",
                }}>
                ${finalPrice.toFixed(2)} USD
              </Typography>{" "}
              for{" "}
              <Typography
                component={"span"}
                sx={{
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  color: "#152C5B",
                }}>
                {capacity} person{capacity !== 1 ? "s" : ""}
              </Typography>{" "}
            </Typography>
          </Box>

          <Box
            sx={{
              marginBlock: "1.5rem",
              width: "13rem",
              marginInline: "auto",
            }}>
            <ButtonForm name="Confirm Booking" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BookingForm;
