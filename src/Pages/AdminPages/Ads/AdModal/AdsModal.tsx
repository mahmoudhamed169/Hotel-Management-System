import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { apiClient } from "../../../../Api/END_POINTS";
import { AxiosError } from "axios";

interface IFacility {
  _id: string;
  name: string;
}

interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: IFacility[];
  images: string[];
}

interface IRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: IRoom[];
  };
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: "0px 4px 4px 0px #00000040",
  p: 4,
};

type FormData = {
  room: string | null;
  discount: number;
  isActive: boolean;
};

interface AdsModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  initialData?: {
    _id: string;
    room: IRoom;
    discount: number;
    isActive: boolean;
  };
}

const AdsModal: React.FC<AdsModalProps> = ({
  open,
  onClose,
  onAdd,
  initialData,
}) => {
  const [rooms, setRooms] = React.useState<IRoom[]>([]);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        setValue("room", initialData.room._id);
        setValue("discount", initialData.discount);
        setValue("isActive", initialData.isActive);
      } else {
        reset();
      }
      setFocus("room");
    }
  }, [initialData, open, reset, setFocus, setValue]);

  React.useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await apiClient.get<IRoomsResponse>("/admin/rooms", {
          params: { page: 1, size: 10000 },
        });
        setRooms(response.data.data.rooms);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch rooms.");
      }
    };

    getAllRooms();
  }, []);

  const onsubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      if (initialData) {
        await apiClient.put(`/admin/ads/${initialData._id}`, {
          isActive: data.isActive,
          discount: data.discount,
        });
        toast.success("Ad Updated successfully", { id: toastId });
      } else {
        await apiClient.post("/admin/ads", {
          room: data.room,
          isActive: data.isActive,
          discount: data.discount,
        });
        toast.success("Ad Added successfully", { id: toastId });
      }

      reset();
      onClose();
      onAdd();
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };

  const options = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <Modal
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: "700", fontSize: "1.5rem" }}
          >
            {initialData ? "Edit Ad" : "Add Ad"}
          </Typography>
          <Button
            sx={{ color: "#CC0000", border: "1px solid #CC0000" }}
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        </Box>
        <form onSubmit={handleSubmit(onsubmit)}>
          <FormControl sx={{ width: "95%", padding: "1.5rem" }}>
            <Stack spacing={2}>
              <Box>
                {initialData ? (
                  <TextField
                    fullWidth
                    label="Room"
                    variant="outlined"
                    value={initialData.room.roomNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                ) : (
                  <FormControl fullWidth error={!!errors.room}>
                    <InputLabel id="room-select-label">Room</InputLabel>
                    <Select
                      labelId="room-select-label"
                      id="room-select"
                      label="Room"
                      {...register("room", { required: "Room is required" })}
                    >
                      {rooms.map((room) => (
                        <MenuItem key={room._id} value={room._id}>
                          {room.roomNumber}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.room?.message}</FormHelperText>
                  </FormControl>
                )}
              </Box>

              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Discount"
                  variant="outlined"
                  type="number"
                  {...register("discount", {
                    required: "Discount is required",
                    min: { value: 0, message: "Discount cannot be negative" },
                  })}
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                />
              </Box>

              <Box>
                <FormControl fullWidth error={!!errors.isActive}>
                  <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      setValue("isActive", newValue ? newValue.value : false);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Active"
                        variant="outlined"
                        error={!!errors.isActive}
                        helperText={errors.isActive?.message}
                      />
                    )}
                    defaultValue={
                      initialData
                        ? options.find(
                            (option) => option.value === initialData.isActive
                          )
                        : options[0]
                    }
                  />
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  type="submit"
                  sx={{
                    background: theme.palette.secondary.main,
                    padding: "14px 57px",
                    color: "#FFFF",
                    borderRadius: "8px",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#0039CB",
                    },
                    "&:disabled": {
                      backgroundColor: "#0039CB",
                      color: "#ffff",
                    },
                  }}
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {isSubmitting ? "Submitting..." : "Save"}
                </Button>
              </Box>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default AdsModal;
