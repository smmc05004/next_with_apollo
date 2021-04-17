import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../oauth/googleAuth";
import { RootStateInterface } from "../../interfaces/rootState";
// import { logout } from "../../modules/auth";
import authSlice from "../../modules/auth";
import NavWrapper from "../common/nav/navWrapper";
import { useEffect, useState } from "react";

const MenuBtnWrapper = styled.div<{ open: boolean }>`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  display: ${({ open }) => (open ? "none" : "block")};

  .menu_btn {
    width: 100%;
    height: 100%;
  }
`;

const MenuWrapper = styled.div<{ open: boolean }>`
  width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-300px")};
  transition: all 0.3s linear;

  .close_btn_wrapper {
    width: 100%;
    height: 30px;
    text-align: right;
    .close_btn {
      width: 30px;
      height: 100%;
    }
  }

  .auth_btn_wrapper {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
  }
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

const MenuBar = () => {
  const dispatch = useDispatch();
  const { isLogined }: HeaderVars = useSelector(
    (state: RootStateInterface) => ({
      isLogined: state.auth.isLogined,
    })
  );
  const [open, setOpen] = useState<boolean>(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(authSlice.actions.LOGOUT());
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <MenuBtnWrapper open={open}>
        <button className="menu_btn" onClick={openMenu}>
          메뉴
        </button>
      </MenuBtnWrapper>

      <MenuWrapper open={open}>
        <div className="close_btn_wrapper">
          <button className="close_btn" onClick={closeMenu}>
            X
          </button>
        </div>

        <div className="auth_btn_wrapper">
          {isLogined === true ? (
            <LogoutBtn onClick={onLogout}>LOGOUT</LogoutBtn>
          ) : (
            <>
              <GoogleAuth authType="login">LOGIN</GoogleAuth>
              <GoogleAuth authType="register">SIGN UP</GoogleAuth>
            </>
          )}
        </div>

        <NavWrapper open={open} setOpen={setOpen} />
      </MenuWrapper>
    </>
  );
};

export default MenuBar;
