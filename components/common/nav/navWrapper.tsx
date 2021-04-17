import styled from "styled-components";
import NavItem from "./navItem";
import menuJson from "./menu.json";
import React from "react";

const NavWrapper = styled.nav<{ open: boolean }>`
  width: 300px;
  height: calc(100% - 120px);
  margin-top: 30px;
`;

const MenuList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const navWrapper: React.FC<Props> = ({ open, setOpen }) => {
  const menuList = menuJson.menuArr.map((menuObj, index) => (
    <NavItem key={index} menuObj={menuObj} setOpen={setOpen} />
  ));

  return (
    <NavWrapper open={open}>
      <MenuList>{menuList}</MenuList>
    </NavWrapper>
  );
};

export default navWrapper;
