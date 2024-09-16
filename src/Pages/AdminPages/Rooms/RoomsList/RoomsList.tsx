import React from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import CustomTable from "./../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";

interface IFacility {
  _id: string;
  name: string;
}

interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: IFacility[];
  images: string[];
}

interface IRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: IRoom[];
  };
}

export default function RoomsList() {
  const [rooms, setRooms] = React.useState<IRoom[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getAllRooms = async () => {
    setLoading(true);

    try {
      const response = await apiClient.get<IRoomsResponse>("/admin/rooms", {
        params: {
          page: 1,
          size: 5,
        },
      });
      setRooms(response.data.data.rooms);
    } catch (err) {
      setError("Failed to load rooms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllRooms();
  }, []);

  const columns = [
    "roomNumber",
    "images",
    "price",
    "capacity",
    "discount",
    "facilities",
  ];

  return (
    <div>
      {loading ? (
        <TableSkeleton columns={columns} rowCount={5} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CustomTable data={rooms} columns={columns} />
      )}
    </div>
  );
}
