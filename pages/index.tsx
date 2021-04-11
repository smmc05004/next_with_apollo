import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import { Loading } from "../components";
import { RootStateInterface } from "../interfaces/rootState";
import { loadingState } from "../interfaces/module/loading/loading.interface";
// import { client } from "../lib/apolloClient";
// import apolloClient from "../lib/apolloClient";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { verifyToken } from "../lib/jwt";
import { getCookie } from "../lib/cookie";

// const GET_TODO_BY_ID = gql`
//   query($todo_id: Int!) {
//     todoById(todo_id: $todo_id) {
//       todo_id
//       todo
//       user {
//         user_num
//         user_id
//         user_name
//       }
//     }
//   }
// `;

const GET_USERS = gql`
  query {
    users {
      user_num
      user_id
      user_name
    }
  }
`;

const GET_USER_BY_ID = gql`
  query($user_id: String!) {
    user(user_id: $user_id) {
      user_num
      user_id
      user_name
    }
  }
`;

// const ADD_USER = gql`
//   mutation($user_id: String!, $user_name: String!) {
//     addUser(user_id: $user_id, user_name: $user_name) {
//       user_id
//       user_name
//     }
//   }
// `;

interface HomeVars extends loadingState {}

// const Home = (props: any) => {
const Home = () => {
  // console.log("props: ", props);
  // const [loginQuery, { called, loading, data }] = useLazyQuery(GET_USER_BY_ID);

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  // const [addUser, { data }] = useMutation(ADD_USER);
  // console.log("login data: ", data);
  // console.log("mutation data: ", data);
  const { data } = useQuery(GET_USERS);
  console.log("data: ", data);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === "userId") {
      setUserId(value);
    } else {
      setUserName(value);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addUser({ variables: { user_id: userId, user_name: userName } });

    // loginQuery({ variables: { user_id: "test1" } });
  };

  return (
    <div>
      <h1>메인 페이지</h1>

      <section>
        <h3>회원가입 폼</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="userId">ID</label>
          <input
            type="text"
            minLength={2}
            maxLength={10}
            name="userId"
            value={userId}
            onChange={onChange}
          />
          <label htmlFor="userName">이름</label>
          <input
            type="text"
            minLength={2}
            maxLength={10}
            name="userName"
            value={userName}
            onChange={onChange}
          />
          <button type="submit">회원가입</button>
        </form>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.req.headers.cookie);
  const cookie = ctx.req.headers.cookie;
  if (cookie) {
    const myCookie = getCookie(cookie);

    const res = verifyToken(myCookie);
    console.log("token veri res: ", res);
  }

  // const { data } = await client.query({
  //   query: GET_USERS,
  // });
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: {
      aaa: "aaa",
    },
  };
};

export default Home;
