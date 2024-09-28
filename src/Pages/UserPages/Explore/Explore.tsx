import {
  Box,
  ButtonBase,
  Grid2 as Grid,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { PhotoCard } from "../../../Components/AdminSharedComponents/PhotoCard/PhotoCard";
import { AxiosError } from "axios";
import { useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";

interface FavoriType {
  rooms: RoomType;
}

interface FavoriResponseType {
  data: {
    favoriteRooms: FavoriType[];
  };
}
export default function Explore() {
  const location = useLocation();
  const rooms = location.state.data;
  const [favoriteRooms, setFavoriteRooms] = useState<FavoriType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(rooms);
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
      room?.rooms.some((room: RoomType) => room._id === id)
    );
  };
  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Grid container spacing={2}>
        {rooms?.map((room, index) => (
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <OpacityAnimate delay={index / 2}>
              <PhotoCard
                room={room}
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
