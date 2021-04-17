import Link from "next/link";
import React from "react";
import styled from "styled-components";

const MenuItem = styled.li`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  padding: 5px;
  font-size: 15px;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;

interface MenuProps {
  menuObj: {
    menu: string;
    href: string;
  };
  setOpen: (value: boolean) => void;
}

const NavItem: React.FC<MenuProps> = ({ menuObj, setOpen }) => {
  const onClick = () => {
    setOpen(false);
  };

  return (
    <MenuItem onClick={onClick}>
      <Link href={menuObj.href}>
        <a>{menuObj.menu}</a>
      </Link>
    </MenuItem>
  );
};

export default NavItem;
