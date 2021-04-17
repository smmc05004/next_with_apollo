import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import TripList from "../list/trip/tripList";
import * as d3 from "d3";

const DetailWrapper = styled.div<{ detail: boolean }>`
  display: ${({ detail }) => (detail ? "block" : "none")};
  width: 50%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const BtnSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  text-align: right;
  .action_wrapper {
    .btn {
      margin: 0 5px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      &:hover {
        color: blue;
      }
    }
    .add {
    }
    .list {
    }
  }
  .close_wrapper {
    .close_btn {
      margin: 0 5px;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;

const DetailSection = styled.section``;

const DetailSvg = styled.svg``;
const DetailG = styled.g`
  fill: white;
  stroke: black;
`;
const DetailPath = styled.path`
  cursor: pointer;
`;

interface Props {
  setActiveRegion: (value: number) => void;
  detail: boolean;
  setDetail: (value: boolean) => void;
}

const Region = ({ setActiveRegion, detail, setDetail }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const detailRef = useRef<SVGPathElement>(null);

  const onDetailClick = () => {
    setActive(true);
  };
  const onCloseDetail = () => {
    setDetail(false);
    setActiveRegion(0);

    d3.select("#detail-path")
      .attr("width", 700)
      .attr("height", 700)
      .attr("d", "");
  };

  useEffect(() => {
    setActive(false);
  }, []);

  return (
    <DetailWrapper detail={detail}>
      <TripList active={active} setActive={setActive} />
      <BtnSection>
        <div className="action_wrapper">
          <button className="btn add">ADD</button>
          <button className="btn list">LIST</button>
        </div>

        <div className="close_wrapper">
          <button className="close_btn" onClick={onCloseDetail}>
            FOLD
          </button>
        </div>
      </BtnSection>

      <DetailSection>
        <DetailSvg width={700} height={700} viewBox="0 0 700 700">
          <DetailG>
            <DetailPath
              id="detail-path"
              ref={detailRef}
              onClick={onDetailClick}
            />
          </DetailG>
        </DetailSvg>
      </DetailSection>
    </DetailWrapper>
  );
};

export default Region;
