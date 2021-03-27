import Link from "next/link";
import styled from "styled-components";
import GoogleAuth from "../oauth/googleAuth";
import { RootStateInterface } from "../../interfaces/rootState";
import NavWrapper from "../common/nav/navWrapper";

const Wrapper = styled.header`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuWrapper = styled.div`
  width: 20%;
  height: 100%;
`;

const Anchor = styled.a`
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
`;

const LogoutBtn = styled.button`
  border: none;
  background-color: white;
  padding: 5px;
`;

interface HeaderVars {
  isLogined: boolean;
}

const Header = () => {
  const onLogout = () => {
    console.log("로그아웃");
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <Link href="/">
          <Anchor>Home</Anchor>
        </Link>
      </MenuWrapper>

      <NavWrapper />

      <MenuWrapper>
        <GoogleAuth authType="login" />
        <GoogleAuth authType="register" />
      </MenuWrapper>
    </Wrapper>
  );
};

export default Header;
