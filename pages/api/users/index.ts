import client from "../client";
import { User } from "../../../interfaces/module/auth/auth.interface";

// import { NextApiRequest, NextApiResponse } from 'next'
// import { sampleUserData } from '../../../utils/sample-data'

// const handler = (_req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (!Array.isArray(sampleUserData)) {
//       throw new Error('Cannot find user data')
//     }

//     res.status(200).json(sampleUserData)
//   } catch (err) {
//     res.status(500).json({ statusCode: 500, message: err.message })
//   }
// }

// export default handler

export const register = async (user: User) => {
  const users = await client.post("/user", { user }).then((res) => {
    return res;
  });
  return users;
};

export const login = async (uid: string) => {
  return await client.post("/login", { uid });
};

export const getUsers = async () =>
  await client.get("/users").then((res) => {
    console.log("res: ", res);
    return res;
  });
