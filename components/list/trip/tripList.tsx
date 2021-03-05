import styled from "styled-components";
import TripItem from "./tripItem";

const ListWrapper = styled.div<{ active: boolean }>`
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  position: absolute;
  top: 0;
  left: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: ${(props) => (props.active ? "100%" : "0px")};
  height: ${(props) => (props.active ? "100%" : "0px")};
  border: 0.5px solid black;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: display, width 0.3s linear, height 0.3s 0.3s linear;
`;

const BtnSection = styled.section<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
  width: 100%;
  height: 30px;
  padding: 5px;
  transition: all 0.3s 0.6s linear;
  text-align: right;
`;

const Btn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ListSection = styled.section<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
  width: 100%;
  padding: 5px;
  transition: all 1s 5s linear;
`;

const List = styled.ul``;

interface Props {
  active: boolean;
  setActive: (value: boolean) => void;
}

const TripList = ({ active, setActive }: Props) => {
  const onClick = () => {
    setActive(false);
  };

  return (
    <ListWrapper active={active}>
      <BtnSection active={active}>
        <Btn onClick={onClick}>x</Btn>
      </BtnSection>

      <ListSection active={active}>
        <List>
          <TripItem />
          <TripItem />
          <TripItem />
        </List>
      </ListSection>
    </ListWrapper>
  );
};

export default TripList;
