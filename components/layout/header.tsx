import styled from "styled-components";
import Link from "next/link";
import GoogleAuth from "../oauth/googleAuth";

const Wrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuWrapper = styled.div`
  height: 100%;
`;

const Anchor = styled.a`
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
`;

const Button = styled.button`
  font-size: 12px;
  font-weight: 400;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 10px;
`;

const Header = () => {
  return (
    <Wrapper>
      <MenuWrapper>
        <Link href="/">
          <Anchor>Home</Anchor>
        </Link>
      </MenuWrapper>
      <MenuWrapper>
        <GoogleAuth authType="login" />
        <GoogleAuth authType="register" />
      </MenuWrapper>
    </Wrapper>
  );
};

export default Header;
