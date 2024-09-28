import { Box, ButtonBase, Tooltip, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}
interface AdsType {
  room: RoomType;
}

export const PhotoCard = ({
  room,
  isFavorite,
  isLoading,
  onToggleFavorite,
  ad,
  eyeIcon,
}: {
  room: RoomType;
  isFavorite: boolean;
  isLoading: boolean;
  onToggleFavorite?: () => void;
  ad: AdsType;
  eyeIcon?: boolean;
}) => {
  console.log(room);
  return (
    <Box
      className="image-box"
      sx={{
        maxHeight: "100%",
        height: "100%",
      }}>
      <img className="image" src={room?.images[0]} />
      <Box
        className="price"
        sx={{
          position: "absolute",
          zIndex: "10",
          right: "0",
          background: "#FF498B",
          minWidth: "120px",
          padding: "10px",
          borderBottomLeftRadius: "10px",
          color: "white",
        }}>
        <Typography variant="body1" component="span" sx={{ padding: "10px" }}>
          $<b>{room?.price}</b> Per Night
        </Typography>
      </Box>
      <Box className="overlay">
        <Box className="text">
          <Typography className="span" variant="body1" component="span">
            {room?.roomNumber.toUpperCase()}
          </Typography>
        </Box>
        {eyeIcon ? (
          <Link to={`/room-details/${room?._id}`} state={room}>
            <ButtonBase disabled={isLoading}>
              <VisibilityIcon sx={{ color: "white", marginRight: "15px" }} />
            </ButtonBase>
          </Link>
        ) : (
          ""
        )}

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
              <FavoriteIcon sx={{ color: !isFavorite ? "white" : "red" }} />
            </ButtonBase>
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};
