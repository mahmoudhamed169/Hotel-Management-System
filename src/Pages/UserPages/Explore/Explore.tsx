import {
  Box,
  ButtonBase,
  Chip,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { PhotoCard } from "../../../Components/AdminSharedComponents/PhotoCard/PhotoCard";
import { AxiosError } from "axios";
import { useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import {
  apiClient,
  getRoomDetails,
  PORTAL_URLS,
} from "../../../Api/END_POINTS";
import BasicBreadcrumbs from "../../../Components/UserSharedComponents/BasicBreadcrumbs/BasicBreadcrumbs";

interface FavoriType {
  rooms: roomType;
}

interface FavoriResponseType {
  data: {
    favoriteRooms: FavoriType[];
  };
}
interface roomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}
interface PickerData {
  state: { data: { rooms: roomType[]; totalCount: number } };
}
interface AllRoomsResponseType {
  data: {
    rooms: roomType[];
    totalCount: number;
  };
}
export default function Explore() {
  const location: PickerData = useLocation();
  console.log(location);
  const [favoriteRooms, setFavoriteRooms] = useState<FavoriType[]>([]);
  const [rooms, SetRooms] = useState<roomType[]>(
    location.state?.data?.rooms || []
  );
  const [totalCount, setTotalCount] = useState<number>(
    location.state?.data?.totalCount || 1
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "highest" | "lowest" | null
  >(null);

  const getAllRooms = async () => {
    try {
      const response = await apiClient.get<AllRoomsResponseType>(
        getRoomDetails
      );

      SetRooms(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const getMyFavoriRooms = async () => {
    try {
      const response = await apiClient.get<FavoriResponseType>(
        PORTAL_URLS.favoriRoom
      );

      setFavoriteRooms(response.data.data.favoriteRooms);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "An unexpected error occurred."
      );
    }
  };
  const handleFavoriteToggle = async (
    roomId: string,
    action: "add" | "remove"
  ) => {
    const toastId = toast.loading("Processing...");
    setIsLoading(true);
    try {
      const response =
        action === "add"
          ? await apiClient.post(PORTAL_URLS.favoriRoom, {
              roomId,
            })
          : await apiClient.delete(`${PORTAL_URLS.favoriRoom}/${roomId}`, {
              data: { roomId },
            });
      getMyFavoriRooms();
      toast.success(response.data.message, {
        id: toastId,
      });
      setIsLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "An unexpected error occurred.",
        {
          id: toastId,
        }
      );
      setIsLoading(false);
    }
  };

  const checkIfRoomInFavori = (id: string) => {
    return favoriteRooms.some((room) =>
      room?.rooms.some((room: roomType) => room._id === id)
    );
  };
  const sortRooms = (value: "highest" | "lowest") => {
    setSelectedFilter(value);
    SetRooms(
      rooms.sort((a, b) =>
        value === "highest" ? b.price - a.price : a.price - b.price
      )
    );
  };
  useEffect(() => {
    if (!location.state?.data?.rooms) {
      getAllRooms();
    }
  }, []);

  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Box>
        <Grid container alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }}>
            <BasicBreadcrumbs current="Room Details" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component={"h2"}
              sx={{
                fontWeight: "600",
                fontSize: "2.1rem",
                lineHeight: "0.5rem",
                color: "#152C5B",
                marginBlock: { xs: "0.5rem", sm: "1rem" },
              }}>
              {location.state?.startDate && location.state?.endDate
                ? `${location.state.startDate.toLocaleDateString()} - ${location.state.endDate.toLocaleDateString()} Available Rooms`
                : "Explore All Rooms"}
            </Typography>
          </Grid>

          <Grid size={{ xs: false, sm: 3 }}></Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "90px" }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="lowest"
            clickable
            color={selectedFilter === "lowest" ? "primary" : "default"}
            onClick={() => sortRooms("lowest")}
          />

          <Chip
            label="highest"
            clickable
            color={selectedFilter === "highest" ? "primary" : "default"}
            onClick={() => sortRooms("highest")}
          />
        </Stack>
      </Box>
      <Typography
        variant="body1"
        sx={{
          paddingBottom: "16px",
          paddingTop: "50px",
          color: "#152C5B",
          fontWeight: "700",
        }}>
        All Rooms
      </Typography>
      <Grid container spacing={2}>
        {rooms?.map((room: roomType, index) => (
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <OpacityAnimate delay={index / 2}>
              <PhotoCard
                value={room}
                eyeIcon
                isFavorite={checkIfRoomInFavori(room._id)}
                isLoading={isLoading}
                onToggleFavorite={() =>
                  checkIfRoomInFavori(room._id)
                    ? handleFavoriteToggle(room._id, "remove")
                    : handleFavoriteToggle(room._id, "add")
                }
              />
            </OpacityAnimate>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ marginTop: "20px", alignItems: "flex-end" }} spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </Box>
  );
}
const OpacityAnimate = ({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "tween",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
        delay: delay,
      }}>
      {children}
    </motion.div>
  );
};
