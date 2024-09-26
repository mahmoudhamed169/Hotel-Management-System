import { useLocation } from "react-router-dom";

export default function RoomDetails() {
  const location = useLocation();
  console.log(location);
  return <div>RoomDetails</div>;
}
