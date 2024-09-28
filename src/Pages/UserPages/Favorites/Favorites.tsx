import { Box, Grid2 as Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { PhotoCard } from "../../../Components/AdminSharedComponents/PhotoCard/PhotoCard";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}

interface FavRoom {
  favoriteRooms:[
    rooms
  ]
}

interface fav {
  rooms:RoomType
}

interface IResponse {
    data:FavRoom
}





export default function Favorites() {
  const [loading, setLoading] =useState<boolean>(true);
const [favList , setFavList]=useState<RoomType[]>([])
console.log(favList);

const getFavlist = async ()=>{


  try {
    const response = await apiClient.get<IResponse>( PORTAL_URLS.favoriRoom)

    console.log(response);
    setFavList(response.data.data.favoriteRooms[0].rooms)
    
  } catch (error) {

    const axiosError = error as AxiosError;
      toast.error(axiosError.message);
    
  }
}

const removeFaveList = async (roomId: string)=>{
  console.log(roomId);
  
  try {
    const response = await apiClient.delete(`${PORTAL_URLS.favoriRoom}/${roomId}`,{
      data:{roomId}
    });

   getFavlist()
   toast.success(response.data.data.message || 'favourite room removed' )
   
  } catch (error) {
    const axiosError = error as AxiosError;
    toast.error(axiosError.message);
    
  }
}

useEffect(()=>{
  getFavlist()
},[])

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
        <Typography
          variant="h1"
          sx={{
            color: "#152C5B",
            fontSize: "36px",
            fontWeight: "600",
            paddingBottom: "73px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Your Favorites
        </Typography>
   
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: "#152C5B",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Your Rooms
          </Typography>

{ loading?
               
                <Box sx={{paddingTop:'20px'}}>
                <Grid container spacing={2}>
                {favList?.map((fav)=>
                    <Grid size={{ xs: 12, lg: 4 }}>
                      <Skeleton variant="text" width="150px" animation="wave" height='100px'/>
                    </Grid>)
                    
                    
                    }
                </Grid>
              </Box>
:
          <Box sx={{paddingTop:'20px'}}>
            <Grid container spacing={2}>
            {favList?.map((fav)=>
                <Grid size={{ xs: 12, lg: 4 }}>
                  <PhotoCard
                  value={fav}                 
                  isFavorite={true}
                  eyeIcon={true}
                  onToggleFavorite={()=>removeFaveList(fav._id)}
                  />
                </Grid>)
                
                
                }
            </Grid>
          </Box>}
        </Box>
      </Box>
    </>
  );
}
