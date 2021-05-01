import Cookies from "js-cookie";
import axios from "axios";


const headersWithRefresh = () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    console.log(refreshToken, accessToken, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    const returning = {
        "accessToken": accessToken && `bearer ${Cookies.get("accessToken")}`,
        "Content-Type": "application/json",
        "refreshToken": refreshToken && `bearer ${Cookies.get("refreshToken")}`
    }
    console.log(returning);
    return returning
}
const headersWithoutRefresh = () => {
    const accessToken = Cookies.get("accessToken");
    return {
        "accessToken": accessToken && `bearer ${Cookies.get("accessToken")}`,
        "Content-Type": "application/json"
    }
}
export default async function Network(url, method, body = {}) {
  const headers =
    url === "http://localhost:3000/users/logout"
      ? headersWithRefresh()
      : headersWithoutRefresh();

    const headers = url === "http://localhost:3000/users/logout" ? headersWithRefresh() : headersWithoutRefresh()

    const config = {
        method,
        url,
        data: body,
        headers,
    }
    return axios(config)
        .then(({ data }) => {
            console.log(data);
            return data;
        }).catch((e) => {
            console.log(e.response);
            switch (e.response.status) {
                case 403:
                    console.log(403);
                    return getRefreshToken(config);
                case 400:
                    console.log(400);
                    console.log(e.response.status);
                    throw { message: e.response.data, status: 400 };

                case 401:
                    console.log(401);
                    console.log(e.response);
                    throw { message: e.response.data, status: 401 };
            }
        })

}
const getRefreshToken = async (config) => {
    console.log(headersWithRefresh(), "33333333333333333333333333333");
    return axios({
        method: "POST", url: "http://localhost:3000/users/newtoken", data: {}, headers: headersWithRefresh()
    }).then((response) => {

        console.log(response.status, "status inside then");
        const tokensFromResponse = response.data;
        console.log("tokensFromResponse before set", tokensFromResponse);
        Cookies.set("accessToken", tokensFromResponse.newAccessToken);
        return Network(config.url, config.method, config.data);
    }).catch((e) => {
        console.log(e.response.data, e.response.status);
        throw { message: e.response.data, status: e.response.status };

    });
};

}

