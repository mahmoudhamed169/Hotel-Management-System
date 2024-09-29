import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export const AUTHENTICATION_URLS = {
  regitser: `admin/users`,
  login: `admin/users/login`,
  forgetPassword: `admin/users/forgot-password`,
  changePassword: `admin/users/change-password`,
  resetPassword: `admin/users/reset-password`,
};

export const ADMIN_URLS = {
  facilities: `admin/room-facilities`,
};
export const PORTAL_URLS = {
  ads: `portal/ads`,
  favoriRoom: `portal/favorite-rooms`,
  addReview: `/portal/room-reviews`,
  getAllReviews: `/portal/room-reviews`,
  addComment: `/portal/room-comments`,
};

export const DASHBOARD_URL = `/admin/dashboard`;

// get rooms

export const getRoomDetails = `/portal/rooms/available/`;
