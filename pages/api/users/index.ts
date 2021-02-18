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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export const register = async (user: User) =>
  await client.post("/api/auth/user", { user });

export const login = async (uid: string) =>
  await client.post("/api/auth/login", { uid });

export const getUsers = async () => await client.get("/users");

export const check = async (token: string) =>
  await client.post(`${baseUrl}/api/auth/check`, { token });

export const logout = async (uid: string) => {
  console.log("api uid: ", uid);
  return await client.post("/api/auth/logout", { uid });
};
