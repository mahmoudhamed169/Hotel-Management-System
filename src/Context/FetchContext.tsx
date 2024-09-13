import React, { createContext, useContext, useState, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const FetchContext = createContext(undefined);

export const FetchProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async ({
    method,
    data,
    params,
    showToastify,
    ToastifyMsg,
    headers,
    url,
  }) => {
    setLoading(true);
    console.log("data");
    try {
      const response = await axios({ url, method, data, params, headers });
      if (showToastify) {
        toast.success(ToastifyMsg);
      }
      console.log(response);
      setLoading(false);
      console.log(response);
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      setLoading(false);
      toast.error(axiosError.response?.data?.message || "Something went wrong");
      throw axiosError;
    }
  };

  return (
    <FetchContext.Provider value={{ fetchData, loading }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchContext);

  return context;
};
