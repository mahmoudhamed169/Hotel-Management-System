import { Add, CalendarMonth, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";
import dayjs from "dayjs";
import CalenderImages from "./CalenderImages";
import { apiClient, getRoomDetails } from "../../../Api/END_POINTS";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

interface DateRange {
  startDate?: string | null;
  endDate?: string | null;
}

export default function CalendarBooking() {
  const navigate = useNavigate();
  console.log(navigate);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [count, setCount] = useState(1);

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
    handlePopoverClose();
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const getRooms = async () => {
    try {
      const { startDate, endDate } = dateRange;

      const response = await apiClient.get(getRoomDetails, {
        params: { startDate, endDate },
      });
      console.log(dateRange);

      console.log(response.data.data.rooms);

      navigate("/explore", {
        state: { data: response.data.data, startDate, endDate },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
  };

  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "700",
              fontSize: { xs: "1.5rem", sm: "2.625rem" },
              marginBottom: ".2rem",
              color: "#152C5B",
              lineHeight: "1.2",
            }}>
            Forget Busy Work,
            <br />
            Start Next Vacation
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "300",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              color: "#B0B0B0",
              lineHeight: "1.7rem",
            }}>
            We provide what you need to enjoy your holiday with family.
            <br /> Time to make another memorable moment.
          </Typography>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                marginBottom: "0.1rem",
                color: "#152C5B",
                lineHeight: "1.875rem",
                mb: "1rem",
              }}>
              Start Booking
            </Typography>
            <Button
              sx={{
                padding: "15px 20px",
                borderRadius: "12px",
                mr: "10px",
              }}
              onClick={handleButtonClick}
              variant="contained"
              color="primary">
              <CalendarMonth />
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              <DateRangePicker
                open={open}
                toggle={() => setAnchorEl(null)}
                onChange={handleDateChange}
              />
            </Popover>
            <TextField
              label="Pick a Date"
              value={`${
                dayjs(dateRange.startDate).format("YYYY-MM-DD") || ""
              } - ${dayjs(dateRange.endDate).format("YYYY-MM-DD") || ""}`}
            />
            <Box sx={{ mt: "1.5rem", display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={handleDecrease}
                sx={{
                  width: "3.5rem",
                  backgroundColor: "#E74C3C",
                  borderRadius: "4px 0px 0px 0px",
                  "&:hover": {
                    backgroundColor: "#E74C3C",
                  },
                  mr: "1rem",
                }}>
                <Remove sx={{ color: "#fff" }} />
              </IconButton>
              <TextField
                sx={{ color: "#152C5B" }}
                label="Capacity"
                value={`${count} person`}
              />
              <IconButton
                onClick={handleIncrease}
                sx={{
                  width: "3.5rem",
                  backgroundColor: "#1ABC9C",
                  borderRadius: "0px 4px 0px 0px",
                  "&:hover": {
                    backgroundColor: "#1ABC9C",
                  },
                  ml: "1rem",
                }}>
                <Add sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Button
              sx={{
                // width: "50%",
                // margin:'auto',
                mt: "2rem",
                backgroundColor: "#3252DF",
                color: "white",
                paddingBlock: "1rem",
                paddingInline: "5rem",
              }}
              onClick={getRooms}>
              Explore
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              mt: "5rem",
              border: "2px solid #E5E5E5",
              borderRadius: "1rem",
              borderTopLeftRadius: "7rem",
              padding: "1rem",
              position: "relative",
              height: "400px",
              // height: "300px",
            }}>
            <CalenderImages />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
