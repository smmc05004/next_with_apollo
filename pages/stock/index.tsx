import { useState } from "react";
import { useDispatch } from "react-redux";
import { stockRequest } from "../../modules/stock";

const Stock = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [stockCode, setStockCode] = useState<string>("");
  const [stockName, setStockName] = useState<string>("");

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(stockRequest({ stockCode, stockName }));
  };

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStockCode(value);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStockName(value);
  };

  return (
    <div>
      <span>stock 페이지</span>

      {open && (
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <input type="text" onChange={onCodeChange} value={stockCode} />
              <input type="text" onChange={onNameChange} value={stockName} />
            </div>
            <div>
              <button type="submit">저장</button>
              <button onClick={onCloseModal}>취소</button>
            </div>
          </form>
        </div>
      )}

      <button onClick={onOpenModal}>추가</button>
    </div>
  );
};

export default Stock;
