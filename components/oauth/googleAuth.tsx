import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import styled from "styled-components";
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
  console.log("authType: ", authType);
  const onLogin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("response: ", response);
  };

  const onRegister = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("response: ", response);
  };

  const onFailure = (error: any): void => {
    console.log("error: ", error);
  };

  return (
    <GoogleLogin
      clientId="474903007958-tfrocrt5br005vl7l4qhfr0dh52o7tco.apps.googleusercontent.com"
      onSuccess={authType === "login" ? onLogin : onRegister}
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
