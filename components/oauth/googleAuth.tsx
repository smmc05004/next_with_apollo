import styled from "styled-components";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useDispatch } from "react-redux";
import { register } from "../../modules/auth";

const AuthBtn = styled.button`
background-color: white;
border: none;
cursor: pointer;
padding: 5px;
}
`;
type AuthAction = "login" | "register";

interface AuthType {
  authType: AuthAction;
}

const GoogleAuth = ({ authType }: AuthType) => {
  const dispatch = useDispatch();
  const onLogin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("response: ", response);
  };

  const onRegister = (response: any) => {
    // console.log("response: ", response);
    const profile = response.profileObj;
    // console.log("profile: ", profile);
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
