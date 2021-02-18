import jwt from "jsonwebtoken";

const tokenSecret = process.env.NEXT_PUBLIC_TOKEN_SECRET || '';
const sessionTime = Number(process.env.NEXT_PUBLIC_SESSION_TIME) || 0;

function getToken(queryRes: any) {

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + sessionTime,
      data: queryRes[0].user_id,
    },
    tokenSecret
  );

  return token;
}

function verifyToken(token: any) {
  // const tokenSecret = process.env.NEXT_PUBLIC_TOKEN_SECRET || '';

  const verifyRes = jwt.verify(token, tokenSecret);

  return verifyRes;
}

export { getToken, verifyToken }