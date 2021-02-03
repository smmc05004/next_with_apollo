import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <Wrapper>
      <span>footer</span>
    </Wrapper>
  );
};

export default Footer;
