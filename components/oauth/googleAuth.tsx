import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { register, login } from "../../modules/auth";
import { AuthType } from '../../interfaces/module/auth/auth.interface';

const AuthBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const GoogleAuth = ({ authType }: AuthType) => {
  const dispatch = useDispatch();

  const onLogin = (
    response: any
  ) => {
    const profile = response.profileObj;
    const id = profile.googleId;
    dispatch(login({ id }));
  };

  const onRegister = (response: any) => {
    const profile = response.profileObj;
    const id = profile.googleId;
    const name = profile.name;
    dispatch(register({ id, name }));
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
