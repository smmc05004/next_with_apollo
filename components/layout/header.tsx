import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../oauth/googleAuth";
import { RootStateInterface } from "../../interfaces/rootState";
import { logout } from "../../modules/auth";

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

const LogoutBtn = styled.button`
  border: none;
  background-color: white;
  padding: 5px;
`;

interface HeaderVars {
  isLogined: boolean;
}

const Header = () => {
  const dispatch = useDispatch();
  const { isLogined }: HeaderVars = useSelector(
    (state: RootStateInterface) => ({
      isLogined: state.auth.isLogined,
    })
  );

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <Link href="/">
          <Anchor>Home</Anchor>
        </Link>
      </MenuWrapper>
      <MenuWrapper>
        {isLogined === true ? (
          <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
        ) : (
          <>
            <GoogleAuth authType="login" />
            <GoogleAuth authType="register" />
          </>
        )}
      </MenuWrapper>
    </Wrapper>
  );
};

export default Header;
