import jwt from "jsonwebtoken";

function getToken(queryRes: any) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 604800000,
      data: queryRes[0].user_id,
    },
    "secret"
  );

  return token;
}

function verifyToken(token: any) {
  const verifyRes = jwt.verify(token, "secret");

  return verifyRes;
}

export { getToken, verifyToken }