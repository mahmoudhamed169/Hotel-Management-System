import { DateRangePicker } from "mui-daterange-picker";
import { Box, Popover, Button, TextField } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { useState } from "react";
import dayjs from "dayjs";

interface DateRange {
  startDate?: string | null;
  endDate?: string | null;
}

interface DateRangeSelectorProps {
  onDateChange: (range: DateRange) => void;
}

function DateRangeSelector({ onDateChange }: DateRangeSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const open = Boolean(anchorEl);

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (range: DateRange) => {
    if (range.startDate && range.endDate) {
      setDateRange(range);
      onDateChange(range);
    }
    handlePopoverClose();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        sx={{
          padding: "15px 20px",
          borderRadius: "12px",
          mr: "10px",
          mt: "12px",
        }}
      >
        <CalendarMonth />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <DateRangePicker
          open={open}
          toggle={handlePopoverClose}
          onChange={handleDateChange}
        />
      </Popover>

      <TextField
        fullWidth
        value={
          dateRange.startDate && dateRange.endDate
            ? `${dayjs(dateRange.startDate).format("YYYY-MM-DD")} - ${dayjs(
                dateRange.endDate
              ).format("YYYY-MM-DD")}`
            : "Select a date range"
        }
        InputProps={{ readOnly: true }}
        onClick={handleButtonClick}
        sx={{
          marginTop: "1rem",
          cursor: "pointer",
        }}
      />
    </Box>
  );
}

export default DateRangeSelector;
