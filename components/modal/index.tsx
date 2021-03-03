import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { StockData } from "../../interfaces";
import { Button, StockList } from "../../components";
import InputWrapper from "./InputWrapper";

const Wrapper = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-100%")};
  background-color: white;
  border: 0.5px solid black;
  transition: all 0.3s linear;
  z-index: 1;
`;

const FormEl = styled.form`
  width: 100%;
  padding: 5px 20px 20px 20px;
`;

const CloseBtnWrapper = styled.div`
  text-align: right;
`;

const CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;
`;

const InputSection = styled.section`
  width: 100%;
`;

const BtnSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    code: string,
    name: string
  ) => void;
  list: StockData[];
  totalCnt: number;
}

const Modal = ({ open, setOpen, onSubmit, list, totalCnt }: Props) => {
  console.log("Modal 렌더링");
  console.log(list, totalCnt);

  const [stockCode, setStockCode] = useState<string>("");
  const [stockName, setStockName] = useState<string>("");

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStockCode(value);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStockName(value);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setStockCode("");
    setStockName("");
  }, [open]);

  return (
    <Wrapper open={open}>
      <CloseBtnWrapper>
        <CloseBtn onClick={onCloseModal}>x</CloseBtn>
      </CloseBtnWrapper>
      <FormEl onSubmit={(e) => onSubmit(e, stockCode, stockName)}>
        <InputSection>
          <InputWrapper
            id="code"
            onChange={onCodeChange}
            value={stockCode}
            label="종목코드: "
            maxLeng={6}
          />
          <InputWrapper
            id="name"
            onChange={onNameChange}
            value={stockName}
            label="종목명: "
            maxLeng={50}
          />
        </InputSection>

        <BtnSection>
          <Button type="submit">저장</Button>
          <Button type="button" onClick={onCloseModal}>
            취소
          </Button>
        </BtnSection>
      </FormEl>

      {/* <StockList list={list} totalCnt={totalCnt} /> */}
      <StockList />
    </Wrapper>
  );
};

export default Modal;
