const BASE_URL = "https://upskilling-egypt.com:3000/api/v0";

const BASE_ADMIN_URL = `${BASE_URL}/admin`;

export const AUTHENTICATION_URLS = {
  regitser: `${BASE_ADMIN_URL}/users`,
  login: `${BASE_ADMIN_URL}/users/login`,
  forgetPassword: `${BASE_ADMIN_URL}/users/forgot-password`,
  changePassword: `${BASE_ADMIN_URL}/users/change-password`,
  resetPassword: `${BASE_ADMIN_URL}/users/reset-password`,
};