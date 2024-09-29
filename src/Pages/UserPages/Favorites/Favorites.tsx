import { Box, Grid, Pagination, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { PhotoCard } from "../../../Components/AdminSharedComponents/PhotoCard/PhotoCard";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import BasicBreadcrumbs from "../../../Components/UserSharedComponents/BasicBreadcrumbs/BasicBreadcrumbs";
import NoDataFound from "../../../Components/UserSharedComponents/NoDataFound/NoDataFound";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}

interface FavRoom {
  favoriteRooms: { rooms: RoomType[] }[];
}

interface IResponse {
  data: FavRoom;
}

export default function Favorites() {
  const [loading, setLoading] = useState<boolean>(true);
  const [favList, setFavList] = useState<RoomType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(2);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [paginatedFavList, setPaginatedFavList] = useState<RoomType[]>([]);

  const getFavlist = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<IResponse>(`${PORTAL_URLS.favoriRoom}?page=${currentPage}&limit=${itemsPerPage}`);
      const favoriteRooms = response.data.data.favoriteRooms[0];
      const rooms = favoriteRooms.rooms || [];
      setFavList(rooms);
      setTotalCount(rooms.length);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message || "Failed to load favorite rooms.");
    } finally {
      setLoading(false);
    }
  };

  const removeFaveList = async (roomId: string) => {
    try {
      const response = await apiClient.delete(`${PORTAL_URLS.favoriRoom}/${roomId}`, {
        data: { roomId },
      });
      toast.success(response.data.data.message || "Favorite room removed");

      // Update the local state immediately
      setFavList((prev) => {
        const updatedList = prev.filter(room => room._id !== roomId);
        // Check if the current page becomes empty after removal
        if (updatedList.length < (currentPage - 1) * itemsPerPage + 1) {
          setCurrentPage(prev => Math.max(prev - 1, 1)); // Decrement page if it's empty
        }
        return updatedList;
      });
      setTotalCount((prev) => prev - 1); // Decrement total count
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message || "Failed to remove favorite room.");
    }
  };

  useEffect(() => {
    getFavlist();
  }, []);

  useEffect(() => {
    setPaginatedFavList(favList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [favList, currentPage, itemsPerPage]);

  return (
    <Box sx={{ width: "85%", margin: "auto", paddingInline: "20px", paddingTop: "50px" }}>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={3}>
            <BasicBreadcrumbs current="Favorites" />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
            <Typography variant="h5" component={"h2"} sx={{ fontWeight: "600", fontSize: "2.1rem", lineHeight: "0.5rem", color: "#152C5B", marginBlock: { xs: "0.5rem", sm: "1rem" } }}>
              Your Favorites
            </Typography>
          </Grid>
          <Grid item xs={false} sm={3}></Grid>
        </Grid>
      </Box>

      <Box>
        {favList.length > 0 && (
          <Typography variant="h3" sx={{ color: "#152C5B", fontSize: "24px", fontWeight: "600", marginTop: '73px' }}>
            Your Rooms
          </Typography>
        )}

        {loading ? (
          <Box sx={{ paddingTop: "20px" }}>
            <Grid container spacing={2}>
              {[...Array(itemsPerPage)].map((_, index) => (
                <Grid item key={index} xs={12} sm={6} lg={4}>
                  <Skeleton variant="rectangular" width="100%" animation="wave" height="315px" sx={{ borderRadius: '15px' }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ paddingTop: "20px" }}>
            {paginatedFavList.length > 0 ? (
              <Grid container spacing={2}>
                {paginatedFavList.map((fav) => (
                  <Grid item key={fav._id} xs={12} sm={6} lg={4}>
                    <PhotoCard
                      value={fav}
                      isFavorite={true}
                      eyeIcon={true}
                      onToggleFavorite={() => removeFaveList(fav._id)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoDataFound />
            )}
          </Box>
        )}

        {totalCount > 0 && (
          <Pagination
            onChange={(e, value) => setCurrentPage(value)}
            page={currentPage}
            count={Math.ceil(totalCount / itemsPerPage)}
            color="primary"
            sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
          />
        )}
      </Box>
    </Box>
  );
}
