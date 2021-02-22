import styled from 'styled-components';

const Btn = styled.button``;

interface Props {
  children: string,
  type: "button" | "submit" | "reset" | undefined,
  onClick?: () => void,
}

const Button = ({ children, type, onClick }: Props) => {
  return (
    <Btn type={type} onClick={onClick} >{children}</Btn>
  )
}

export default Button;