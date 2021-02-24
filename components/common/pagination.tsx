import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  totalCnt: Number;
}

const Pagination = () => {
  const [active, setActive] = useState<Number>(1);

  return (
    <Wrapper>
      <div>
        <button>처음</button>
      </div>
      <div>
        <button>이전</button>
      </div>

      <div>
        <button>1</button>
        <button>2</button>
      </div>

      <div>
        <button>다음</button>
      </div>
      <div>
        <button>끝</button>
      </div>
    </Wrapper>
  );
};

export default Pagination;
