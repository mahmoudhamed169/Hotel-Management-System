import {
  Box,
  ButtonBase,
  Grid2 as Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import "./imageBox.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { PhotoCard } from "../../AdminSharedComponents/PhotoCard/PhotoCard";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}
interface AdsType {
  room: RoomType;
}

interface ResponseType {
  data: {
    ads: AdsType[];
  };
}

interface FavoriType {
  rooms: RoomType;
}

interface FavoriResponseType {
  data: {
    favoriteRooms: FavoriType[];
  };
}

export default function MostPopularAds() {
  const [ads, setAds] = useState<AdsType[]>([]);
  const [favoriteRooms, setFavoriteRooms] = useState<FavoriType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAds = async () => {
    setLoading(false);
    try {
      const response = await apiClient.get<ResponseType>(PORTAL_URLS.ads, {
        params: { page: 1, size: 5 },
      });
      setAds(response.data.data.ads);
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
      room?.rooms.some((room: RoomType) => room._id === id)
    );
  };

  useEffect(() => {
    getAds();
    if (localStorage.getItem("token")) {
      getMyFavoriRooms();
    }
  }, []);

  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Typography
        variant="body1"
        component="h2"
        sx={{
          fontWeight: "500",
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#152C5B",
        }}>
        Most popular ads
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, lg: 4 }}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <PhotoCard
                isFavorite={checkIfRoomInFavori(ads[0]?.room._id)}
                eyeIcon
                isLoading={isLoading}
                onToggleFavorite={() =>
                  checkIfRoomInFavori(ads[0]?.room._id)
                    ? handleFavoriteToggle(ads[0]?.room._id, "remove")
                    : handleFavoriteToggle(ads[0]?.room._id, "add")
                }
                value={ads[0]?.room}
              />
            )}
          </Grid>
          <Grid container size={{ xs: 12, lg: 8 }}>
            {ads ? (
              ads
                ?.slice(1)
                .map((ad: AdsType) => (
                  <Grid size={{ xs: 12, lg: 6 }}>
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                      />
                    ) : (
                      <PhotoCard
                        isFavorite={checkIfRoomInFavori(ad.room._id)}
                        eyeIcon
                        isLoading={isLoading}
                        onToggleFavorite={() =>
                          checkIfRoomInFavori(ad.room._id)
                            ? handleFavoriteToggle(ad.room._id, "remove")
                            : handleFavoriteToggle(ad.room._id, "add")
                        }
                        value={ad.room}
                      />
                    )}
                  </Grid>
                ))
            ) : (
              <Skeleton
                variant="text"
                width="100%"
                height="100%"
                animation="wave"
              />
            )}
            {}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
