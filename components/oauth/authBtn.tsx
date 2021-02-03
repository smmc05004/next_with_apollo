import styled from "styled-components";

const Btn = styled.button`
  background-color: none;
  border: none;
`;

type AuthAction = "login" | "register";

interface AuthBtnProps {
  authType: AuthAction;
}

const AuthBtn = ({ authType }: AuthBtnProps) => {
  return <Btn>{authType === "login" ? "로그인" : "회원가입"}</Btn>;
};

export default AuthBtn;
