import jwt from "jsonwebtoken";

const getToken = (userId: string) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24 * 7,
      data: userId,
    },
    "secret"
  );
  return token;
};

const verifyToken = (token: any) => {
  const verifyRes = jwt.verify(token, "secret");

  return verifyRes;
};

export { getToken, verifyToken };
