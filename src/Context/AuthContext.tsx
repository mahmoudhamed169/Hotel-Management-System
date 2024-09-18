import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "../Api/END_POINTS";

interface IUser {
  profileImage:string,
  userName : string,
}

interface IResponse{
  success:string,
  message:string,
  data:{user:IUser};
}
export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState();

  const [userId, setUserId]=useState()
  const [userData, setUserData]=useState<IUser>()

  const saveLoginData = () => {

    const encodedToken = localStorage.getItem('token')
    const decodedToken = jwtDecode(encodedToken)
    setLoginData(decodedToken);
    console.log(loginData);
    

  };

  useEffect(() => {

    if (localStorage.getItem('token')) {
      saveLoginData()
    }
  }, [])

  const getUserProfile =  async ()=>{

    try {
      const response = await apiClient.get<IResponse>(
        `portal/users/${userId}`

      )
      console.log(response);
      
    setLoginData(response?.data?.data)
      console.log(loginData);
      
      // console.log(userDate);
      toast(userDate?.userName,{
        position:"top-center",
        // padding: '16px',
        icon: '🙌',
      });
      
      
    } catch (error) {
      console.log(error);
      
    }
}
  // useEffect(() => {
  //   if (userId) {
  //     getUserProfile();
  //   }
  // }, []);
  return (
    <AuthContext.Provider value={{ loginData ,setUserId, userId}}>
      {props.children}
    </AuthContext.Provider>
  );
}
