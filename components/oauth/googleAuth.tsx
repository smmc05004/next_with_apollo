import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { AuthType } from "../../interfaces/module/auth/auth.interface";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { getToken } from "../../lib/jwt";
import { setCookie } from "../../lib/cookie";
import { client } from "../../lib/apolloClient";

const GET_USER_BY_ID = gql`
  query($user_id: String!) {
    user(user_id: $user_id) {
      user_num
      user_id
      user_name
    }
  }
`;

const ADD_USER = gql`
  mutation($user_id: String!, $user_name: String!) {
    addUser(user_id: $user_id, user_name: $user_name) {
      user_id
      user_name
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      user_num
      user_id
      user_name
    }
  }
`;

const LOGIN_USER = gql`
  mutation($user_id: String!) {
    login(user_id: $user_id) {
      user_num
      user_id
      user_name
    }
  }
`;

const AuthBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const GoogleAuth = ({ authType }: AuthType) => {
  const [login, loginParam] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      console.log(login.user_id);

      const token = getToken(login.user_id);
      setCookie(token);
    },
  });

  const { data } = useQuery(IS_LOGGED_IN);
  console.log("header data: ", data);

  const [addUser, addParams] = useMutation(ADD_USER);

  const result = client.readQuery({ query: GET_USERS });
  console.log("header: ", result);

  console.log("header cache: ", client.cache);

  const onLogin = (response: any) => {
    const profile = response.profileObj;
    const { googleId } = profile;
    login({ variables: { user_id: googleId } });
  };

  const onRegister = (response: any) => {
    const profile = response.profileObj;
    const { googleId, name } = profile;
    addUser({ variables: { user_id: googleId, user_name: name } });
  };

  const onFailure = (error: any): void => {
    console.log("error: ", error);
  };

  return (
    <GoogleLogin
      clientId="474903007958-tfrocrt5br005vl7l4qhfr0dh52o7tco.apps.googleusercontent.com"
      onSuccess={(result) =>
        authType === "login" ? onLogin(result) : onRegister(result)
      }
      onFailure={onFailure}
      render={(renderProps) => (
        <AuthBtn onClick={renderProps.onClick}>
          {authType === "login" ? "로그인" : "회원가입"}
        </AuthBtn>
      )}
    />
  );
};

export default GoogleAuth;
