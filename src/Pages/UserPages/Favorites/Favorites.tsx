import { Box, Grid2, Skeleton, Typography } from "@mui/material";
import {Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { PhotoCard } from "../../../Components/AdminSharedComponents/PhotoCard/PhotoCard";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import NoDataFound from "../../../Components/UserSharedComponents/NoDataFound/noDataFound";
import BasicBreadcrumbs from "../../../Components/UserSharedComponents/BasicBreadcrumbs/BasicBreadcrumbs";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}

interface FavRoom {
  favoriteRooms: [rooms];
}

interface fav {
  rooms: RoomType;
}

interface IResponse {
  data: FavRoom;
}

export default function Favorites() {
  const [loading, setLoading] = useState<boolean>(true);
  const [favList, setFavList] = useState<RoomType[]>([]);
  console.log(favList);

  const getFavlist = async () => {
    try {
      const response = await apiClient.get<IResponse>(PORTAL_URLS.favoriRoom);

      console.log(response);
      setFavList(response.data.data.favoriteRooms[0].rooms);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
  };

  const removeFaveList = async (roomId: string) => {
    console.log(roomId);

    try {
      const response = await apiClient.delete(
        `${PORTAL_URLS.favoriRoom}/${roomId}`,
        {
          data: { roomId },
        }
      );

      getFavlist();
      toast.success(response.data.data.message || "favourite room removed");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    }
  };

  useEffect(() => {
    getFavlist();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "85%",
          margin: "auto",
          paddingInline: "20px",
          paddingTop: "50px",
        }}
      >
         <Box>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={3}>
              <BasicBreadcrumbs current="Favorites" />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                component={"h2"}
                sx={{
                  fontWeight: "600",
                  fontSize: "2.1rem",
                  lineHeight: "0.5rem",
                  color: "#152C5B",
                  marginBlock: { xs: "0.5rem", sm: "1rem" },
                }}
              >
                Your Favorites
              </Typography>
           
            </Grid>

            <Grid item xs={false} sm={3}></Grid>
          </Grid>
        </Box>

        <Box>
          {favList.length > 0 && (
            <Typography
              variant="h3"
              sx={{
                color: "#152C5B",
                fontSize: "24px",
                fontWeight: "600",
                marginTop:'73px'
              }}
            >
              Your Rooms
            </Typography>
          )}

          {loading ? (
            <Box sx={{ paddingTop: "20px" }}>
              <Grid2 container spacing={2}>
                {favList?.map((fav) => (
                  <Grid2 size={{ xs: 12, lg: 4 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      animation="wave"
                      height="315px"
                      sx={{borderRadius:'15px'}}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          ) : (
            <Box sx={{ paddingTop: "20px" }}>
              {favList.length > 0 ? (
                <Grid2 container spacing={2}>
                  {favList?.map((fav) => (
                    <Grid2 size={{ xs: 12, lg: 4 }}>
                      <PhotoCard
                        value={fav}
                        isFavorite={true}
                        eyeIcon={true}
                        onToggleFavorite={() => removeFaveList(fav._id)}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              ) : (
                <NoDataFound />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
