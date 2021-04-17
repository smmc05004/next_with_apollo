import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
// import { register, login } from "../../modules/auth";
import authSlice from "../../modules/auth";

import { AuthType } from "../../interfaces/module/auth/auth.interface";
import React from "react";

const AuthBtn = styled.button`
  width: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  font-size: 15px;
  &:hover {
  }
`;

const GoogleAuth: React.FC<AuthType> = ({ authType }) => {
  const dispatch = useDispatch();

  const onLogin = (response: any) => {
    const profile = response.profileObj;
    const id = profile.googleId;
    dispatch(authSlice.actions.LOGIN({ id }));
  };

  const onRegister = (response: any) => {
    const profile = response.profileObj;
    const id = profile.googleId;
    const name = profile.name;
    dispatch(authSlice.actions.REGISTER({ id, name }));
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
          {authType === "login" ? "LOGIN" : "SIGN UP"}
        </AuthBtn>
      )}
    />
  );
};

export default GoogleAuth;
