import { createContext, useContext, useState, ReactNode } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface fetchType {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?:
    | {
        pageSize: string;
        pageNumber: string;
      }
    | undefined;
  showToastify?: boolean;
  ToastifyMsg?: string;
  headers?: AxiosRequestConfig["headers"];
}
interface FetchContextType {
  fetchData: (options: fetchType) => Promise<any>;
  loading: boolean;
  response: [];
}
const FetchContext = createContext<FetchContextType | undefined>(undefined);

interface fetchType {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?:
    | {
        pageSize: string;
        pageNumber: string;
      }
    | undefined;
  showToastify?: boolean;
  ToastifyMsg?: string;
  headers?: AxiosRequestConfig["headers"];
}
export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse[]>([]);
  const navigate = useNavigate();

  const fetchData = async ({
    method,
    data,
    params,
    showToastify,
    ToastifyMsg,
    headers,
    url,
  }: fetchType) => {
    setLoading(true);

    try {
      const response = await axios({ url, method, data, params, headers });
      if (showToastify) {
        toast.success(response?.data?.message || ToastifyMsg);
      }
      navigate("/auth/login");

      setResponse([response]);
      setLoading(false);

      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      setLoading(false);
      toast.error(axiosError.response?.data?.message || "Something went wrong");
      throw axiosError;
    }
  };

  return (
    <FetchContext.Provider value={{ fetchData, loading, response }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchContext);

  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
};
