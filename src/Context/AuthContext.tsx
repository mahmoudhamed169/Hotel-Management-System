import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../Api/END_POINTS";

interface IUser {
  profileImage: string;
  userName: string;
}

interface IResponse {
  success: string;
  message: string;
  data: { user: IUser };
}

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState<IUser | null>(
    () => JSON.parse(localStorage.getItem("loginData") as string) || null
  );
  const [userId, setUserId] = useState<string | undefined>();

  console.log("User ID:", userId);

  const getUserProfile = async () => {
    try {
      const response = await apiClient.get<IResponse>(`portal/users/${userId}`);
      const user = response.data.data.user;

      setLoginData(user);
      localStorage.setItem("loginData", JSON.stringify(user));
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ setUserId, loginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
