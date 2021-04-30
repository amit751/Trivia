require("dotenv").config;
const jwt = require("jsonwebtoken");
const { RefreshTokens } = require("../../models");

function validator(req, res, next) {
  const refreshToken = req.header["refreshToken"].split(" ")[1];
  const accessToken = req.header["accessToken"].split(" ")[1];
  //check accesstoken
  try {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (errAccess, userAccess) => {
        if (errAccess) {
          const tokenIsValid = await RefreshTokens.findOne({
            where: { refresh_token: refreshToken },
          });
          if (!tokenIsValid)
            return res.status(403).send("invalid refresh token");
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (errRefresh, userRefresh) => {
              if (errRefresh)
                return res.status(403).send("invalid refresh token");
              //refresh token is good but access token is not
              const newAccessToken = jwt.sign(
                userRefresh,
                process.env.ACCESS_TOKEN_SECRET
              );
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = { validator };
