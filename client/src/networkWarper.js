import Cookies from "js-cookie";
import axios from "axios";

const headersWithRefresh = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  const returning = {
    accessToken: accessToken && `bearer ${Cookies.get("accessToken")}`,
    "Content-Type": "application/json",
    refreshToken: refreshToken && `bearer ${Cookies.get("refreshToken")}`,
  };

  return returning;
};
const headersWithoutRefresh = () => {
  const accessToken = Cookies.get("accessToken");
  return {
    accessToken: accessToken && `bearer ${Cookies.get("accessToken")}`,
    "Content-Type": "application/json",
  };
};
export default async function Network(url, method, body = {}) {
  const headers =
    url === "http://localhost:3000/users/logout"
      ? headersWithRefresh()
      : headersWithoutRefresh();

  const config = {
    method,
    url,
    data: body,
    headers,
  };
  return axios(config)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e.response);
      switch (e.response.status) {
        case 403:
          return getRefreshToken(config);
        case 400:
          throw { message: e.response.data, status: 400 };

        case 401:
          throw { message: e.response.data, status: 401 };
        default:
          throw e;
      }
    });
}
const getRefreshToken = async (config) => {
  return axios({
    method: "POST",
    url: "http://localhost:3000/users/newtoken",
    data: {},
    headers: headersWithRefresh(),
  })
    .then((response) => {
      const tokensFromResponse = response.data;

      Cookies.set("accessToken", tokensFromResponse.newAccessToken);
      return Network(config.url, config.method, config.data);
    })
    .catch((e) => {
      throw { message: e.response.data, status: e.response.status };
    });
};
