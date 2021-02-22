import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
`;

const LabelEl = styled.label`
  width: 30%;
  display: inline-block;
`;

const InputEl = styled.input`
  width: 70%;
`;

interface Props {
  id: string,
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  label: string,
  maxLeng: number,
}

const ModalInput = ({ id, onChange, value, label, maxLeng }: Props) => {
  return (
    <InputWrapper>
      <LabelEl htmlFor={id}>{label}</LabelEl>
      <InputEl id={id} type="text" onChange={onChange} value={value} minLength={2} maxLength={maxLeng} />
    </InputWrapper>
  )
}

export default ModalInput;