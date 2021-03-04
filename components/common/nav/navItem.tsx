import Link from "next/link";
import styled from "styled-components";

const MenuItem = styled.li`
  padding: 5px;
`;

interface MenuProps {
  menuObj: {
    menu: string;
    href: string;
  };
}

const NavItem = ({ menuObj }: MenuProps) => {
  return (
    <MenuItem>
      <Link href={menuObj.href}>
        <a>{menuObj.menu}</a>
      </Link>
    </MenuItem>
  );
};

export default NavItem;
