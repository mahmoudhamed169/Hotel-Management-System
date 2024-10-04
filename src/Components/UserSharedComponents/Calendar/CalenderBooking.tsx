import { Add, CalendarMonth, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";
import dayjs from "dayjs";
import CalenderImages from "./CalenderImages";
import { apiClient, getRoomDetails } from "../../../Api/END_POINTS";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/images/image 3.png";

interface DateRange {
  startDate?: string | null;
  endDate?: string | null;
}

export default function CalendarBooking() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [count, setCount] = useState(1);
  const [error, setError] = useState<string>("");

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
    setError("");
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
    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please pick a start and end date.");
      return;
    }

    try {
      const { startDate, endDate } = dateRange;

      const response = await apiClient.get(getRoomDetails, {
        params: { startDate, endDate },
      });

      console.log(dateRange);
      console.log(response.data.data.rooms);

      navigate("/explore");
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
            }}
          >
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
            }}
          >
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
              }}
            >
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
              color="primary"
            >
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
              }}
            >
              <DateRangePicker
                open={open}
                toggle={() => setAnchorEl(null)}
                onChange={handleDateChange}
                minDate={dayjs()}
              />
            </Popover>
            <TextField
              onClick={handleButtonClick}
              label="Pick a Date"
              value={
                dateRange.startDate && dateRange.endDate
                  ? `${dayjs(dateRange.startDate).format(
                      "YYYY-MM-DD"
                    )} - ${dayjs(dateRange.endDate).format("YYYY-MM-DD")}`
                  : "Pick a Start & End Date"
              }
              error={Boolean(error)}
            />
            {error && (
              <FormHelperText error sx={{ ml: "5rem" }}>
                {error}
              </FormHelperText>
            )}
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
                }}
              >
                <Remove sx={{ color: "#fff" }} />
              </IconButton>
              <TextField
                sx={{ color: "#152C5B" }}
                label="Capacity"
                value={`${count} person`}
                readOnly
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
                }}
              >
                <Add sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Button
              sx={{
                mt: "2rem",
                backgroundColor: "#3252DF",
                color: "white",
                paddingBlock: "1rem",
                paddingInline: "5rem",
              }}
              onClick={getRooms}
            >
              Explore
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              width: { xs: "75%", sm: "80%" },
              height: { xs: "490px", sm: "490px" },
              border: "2px solid #E5E5E5",
              borderRadius: "15px",
              position: "relative",
              marginTop: "2.5rem",
              marginInline: { xs: "auto" },
            }}
          >
            <img
              src={img}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "105px 20px 20px 20px",
                position: "absolute",
                bottom: "40px",
                right: "40px",

                // ...(window.innerWidth >= 600 && {
                //   position: "absolute",
                //   bottom: "40px",
                //   right: "40px",
                // }),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
