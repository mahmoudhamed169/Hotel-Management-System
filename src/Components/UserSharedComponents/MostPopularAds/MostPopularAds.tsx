import {
  Box,
  ButtonBase,
  Grid2 as Grid,
  Paper,
  Skeleton,
  styled,
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAds = async () => {
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
            {/* <Item sx={{ height: "100% !important" }}>size=8/24</Item> */}
            {console.log(ads[0]?.room)}
            {ads ? (
              // <Box
              //   className="image-box"
              //   sx={{
              //     maxHeight: "100%",
              //     height: "100%",
              //   }}>
              //   <img className="image" src={ads[0]?.room.images[0]} />
              //   <Box className="overlay">
              //     <Link
              //       to={`/room-details/${ads[0]?.room._id}`}
              //       state={ads[0]?.room}>
              //       <ButtonBase disabled={isLoading}>
              //         <VisibilityIcon
              //           sx={{ color: "white", marginRight: "15px" }}
              //         />
              //       </ButtonBase>
              //     </Link>
              //     <Tooltip
              //       TransitionProps={{ timeout: 600 }}
              //       title={
              //         localStorage.getItem("token")
              //           ? checkIfRoomInFavori(ads[0]?.room._id)
              //             ? "Remove from Favori"
              //             : "Add to Favori"
              //           : "You must be logged in"
              //       }
              //       placement="top">
              //       <Typography>
              //         <ButtonBase
              //           onClick={() =>
              //             checkIfRoomInFavori(ads[0]?.room._id)
              //               ? handleFavoriteToggle(ads[0]?.room._id, "remove")
              //               : handleFavoriteToggle(ads[0]?.room._id, "add")
              //           }
              //           disabled={isLoading || !localStorage.getItem("token")}>
              //           {!checkIfRoomInFavori(ads[0]?.room._id) ? (
              //             <FavoriteBorderIcon sx={{ color: "red" }} />
              //           ) : (
              //             <FavoriteIcon sx={{ color: "red" }} />
              //           )}
              //         </ButtonBase>
              //       </Typography>
              //     </Tooltip>
              //     <Box className="text">
              //       <Typography
              //         className="span"
              //         variant="body1"
              //         component="span">
              //         {ads[0]?.room.roomNumber.toUpperCase()}
              //       </Typography>
              //     </Box>
              //   </Box>
              // </Box>

              <AdCard
                isFavorite={checkIfRoomInFavori(ads[0]?.room._id)}
                isLoading={isLoading}
                onToggleFavorite={() =>
                  checkIfRoomInFavori(ads[0]?.room._id)
                    ? handleFavoriteToggle(ads[0]?.room._id, "remove")
                    : handleFavoriteToggle(ads[0]?.room._id, "add")
                }
                room={ads[0]?.room}
                ad={ads[0]}
              />
            ) : (
              <Skeleton
                variant="text"
                width="100%"
                height="100%"
                animation="wave"
              />
            )}
          </Grid>
          <Grid container size={{ xs: 12, lg: 8 }}>
            {ads ? (
              ads?.slice(1).map((ad: AdsType) => (
                <Grid size={{ xs: 12, lg: 6 }}>
                  {/* <Box className="image-box">
                    <img className="image" src={ad.room.images[0]} />
                    <Box className="overlay">
                      <Box className="text">
                        <Typography
                          className="span"
                          variant="body1"
                          component="span">
                          {ad.room.roomNumber.toUpperCase()}
                        </Typography>
                      </Box>
                      <Link to={`/room-details/${ad.room._id}`} state={ad.room}>
                        <ButtonBase disabled={isLoading}>
                          <VisibilityIcon
                            sx={{ color: "white", marginRight: "15px" }}
                          />
                        </ButtonBase>
                      </Link>
                      <Tooltip
                        TransitionProps={{ timeout: 600 }}
                        title={
                          localStorage.getItem("token")
                            ? checkIfRoomInFavori(ad.room._id)
                              ? "Remove from Favori"
                              : "Add to Favori"
                            : "You must be logged in"
                        }
                        placement="top">
                        <Typography>
                          <ButtonBase
                            disabled={
                              isLoading || !localStorage.getItem("token")
                            }
                            onClick={() =>
                              checkIfRoomInFavori(ad.room._id)
                                ? handleFavoriteToggle(ad.room._id, "remove")
                                : handleFavoriteToggle(ad.room._id, "add")
                            }>
                            {!checkIfRoomInFavori(ad.room._id) ? (
                              <FavoriteBorderIcon sx={{ color: "red" }} />
                            ) : (
                              <FavoriteIcon sx={{ color: "red" }} />
                            )}
                          </ButtonBase>
                        </Typography>
                      </Tooltip>
                    </Box>
                  </Box> */}
                  <AdCard
                    isFavorite={checkIfRoomInFavori(ad.room._id)}
                    isLoading={isLoading}
                    onToggleFavorite={() =>
                      checkIfRoomInFavori(ad.room._id)
                        ? handleFavoriteToggle(ad.room._id, "remove")
                        : handleFavoriteToggle(ad.room._id, "add")
                    }
                    room={ad.room}
                    ad={ad}
                  />
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

const AdCard = ({
  room,
  isFavorite,
  isLoading,
  onToggleFavorite,
  ad,
}: {
  room: RoomType;
  isFavorite: boolean;
  isLoading: boolean;
  onToggleFavorite: () => void;
  ad: AdsType;
}) => {
  return (
    <Box
      className="image-box"
      sx={{
        maxHeight: "100%",
        height: "100%",
      }}>
      <img className="image" src={room?.images[0]} />
      <Box className="overlay">
        <Box className="text">
          <Typography className="span" variant="body1" component="span">
            {room?.roomNumber.toUpperCase()}
          </Typography>
        </Box>
        <Link to={`/room-details/${room?._id}`} state={ad?.room}>
          <ButtonBase disabled={isLoading}>
            <VisibilityIcon sx={{ color: "white", marginRight: "15px" }} />
          </ButtonBase>
        </Link>
        <Tooltip
          TransitionProps={{ timeout: 600 }}
          title={
            localStorage.getItem("token")
              ? isFavorite
                ? "Remove from Favori"
                : "Add to Favori"
              : "You must be logged in"
          }
          placement="top">
          <Typography>
            <ButtonBase
              disabled={isLoading || !localStorage.getItem("token")}
              onClick={onToggleFavorite}>
              {!isFavorite ? (
                <FavoriteBorderIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteIcon sx={{ color: "red" }} />
              )}
            </ButtonBase>
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};
