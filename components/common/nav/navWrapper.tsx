import styled from "styled-components";
import NavItem from "./navItem";
import menuJson from "./menu.json";

const NavWrapper = styled.nav`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const navWrapper = () => {
  const menuList = menuJson.menuArr.map((menuObj, index) => (
    <NavItem key={index} menuObj={menuObj} />
  ));

  return (
    <NavWrapper>
      <MenuList>{menuList}</MenuList>
    </NavWrapper>
  );
};

export default navWrapper;
