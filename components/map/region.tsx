import styled from "styled-components";
import { useRef, useState } from "react";
import TripList from "../list/trip/tripList";
import * as d3 from "d3";

const DetailWrapper = styled.div`
  position: relative;
`;

const BtnSection = styled.section`
  text-align: right;
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
}

const Region = ({ setActiveRegion }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const detailRef = useRef<SVGPathElement>(null);

  const onDetailClick = () => {
    setActive(true);
  };
  const onCloseDetail = () => {
    setActiveRegion(0);

    d3.select("#detail-path")
      .attr("width", 700)
      .attr("height", 700)
      .attr("d", "");
  };

  return (
    <DetailWrapper>
      <TripList active={active} setActive={setActive} />
      <BtnSection>
        <button onClick={onCloseDetail}>닫기</button>
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
