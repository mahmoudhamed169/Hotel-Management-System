import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { PhotoCard } from "../../../Components/AdminSharedComponents/PhotoCard/PhotoCard";



// interface RoomType {
//   _id: string;
//   roomNumber: string;
//   images: string[];
//   price: number;
// }

// interface FavType {
//   rooms: RoomType;
// }

// interface FavResponse {
//   data: {
//     favoriteRooms: FavoriType[];
//   };
// }



export default function Favorites() {

const [favList , setFavList]=useState([])
console.log(favList);

const getFavlist = async ()=>{


  try {
    const response = await apiClient.get( PORTAL_URLS.favoriRoom)

    console.log(response.data.data.favoriteRooms[0].rooms);
    setFavList(response.data.data.favoriteRooms[0].rooms)
  } catch (error) {

    console.log(error);
    
  }
}

const removeFaveList = async (roomId: string)=>{
  console.log(roomId);
  
  try {
    const response = await apiClient.delete(`${PORTAL_URLS.favoriRoom}/${roomId}`,{
      data:{roomId}
    });
   getFavlist()
   
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  getFavlist()
},[])




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

          <Box sx={{paddingTop:'20px'}}>
            <Grid container spacing={2}>
            {favList?.map((fav)=>
                <Grid size={{ xs: 12, lg: 3 }}>
                  <PhotoCard
                  value={fav}                 
                  isFavorite={true}
                  eyeIcon={true}
                  onToggleFavorite={()=>removeFaveList(fav._id)}
                  />
                </Grid>)}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
