import styled from "styled-components";
import { AuthType } from '../../interfaces/module/auth/auth.interface';

const Btn = styled.button`
  background-color: none;
  border: none;
`;

const AuthBtn = ({ authType }: AuthType) => {
  return <Btn>{authType === "login" ? "로그인" : "회원가입"}</Btn>;
};

export default AuthBtn;
