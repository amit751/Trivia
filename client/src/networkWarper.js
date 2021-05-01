import Cookies from "js-cookie";
import axios from "axios";
// const Cookies = require("js-cookie");
// const axios = require("axios");
console.log("start");
const headersWithRefresh = () => {
  return {
    accessToken: `bearer ${Cookies.get("accessToken")}`,
    "Content-Type": "application/json",
    refreshToken: `bearer ${Cookies.get("refreshToken")}`,
  };
};
const headersWithoutRefresh = () => {
  return {
    accessToken: `bearer ${Cookies.get("accessToken")}`,
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
  axios(config)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((e) => {
      switch (e.response.status) {
        case 403:
          console.log(403);
          return getRefreshToken(config);
        case 400:
          console.log(400);
          return e.response;
        case 401:
          console.log(401);
          return e.response;
      }
    });
}
const getRefreshToken = async (config) => {
  axios
    .post("http://localhost:3000/users/newtoken", {}, headersWithRefresh())
    .then((response) => {
      console.log(response.status);
      if (response.status !== 200) return response.data;
      console.log(" 200");
      const tokensFromResponse = response.data;
      Cookies.set("refreshToken", tokensFromResponse.refreshToken);
      Cookies.set("accessToken", tokensFromResponse.accessToken);
      // const {data} = await axios(config);
      return Network(config.url, config.method, config.data);
    })
    .catch((e) => {
      console.log(e);
      //   return response.data;
    });
};

// const response = await axios(config);
// console.log(response, "the response");
// switch (response.status) {
//     case 200:
//         return response.data;
//     case 403:
//         return getRefreshToken(config);
//     case 400:
//         return response.data
//     case 401:
//         return response.data
// }
