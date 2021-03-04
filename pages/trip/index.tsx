import styled from "styled-components";
import * as GeoJSON from "d3";
import * as d3 from "d3";
// import MAP_GEOSON from "../../components/common/korea.json";
import MAP_GEOSON from "../../components/common/map.geo.json";
import { useEffect } from "react";

const Container = styled.div`
  width: 700px;
  min-height: 700px;
  float: left;
  margin: 15px 35px;
`;
const States = styled.div``;

const path = styled.div`
  fill: #585858;
  stroke: #000000;
  stroke-width: 1.5px;
  &:hover {
    fill: #009300;
  }
`;

const Trip = () => {
  const drawMap = (target: string) => {
    const mapjson = MAP_GEOSON;

    const width = 700; //지도의 넓이
    const height = 700; //지도의 높이
    const initialScale = 5500; //확대시킬 값
    const initialX = -11900; //초기 위치값 X
    const initialY = 4050; //초기 위치값 Y
    let labels;

    // 지도 출력 방법 선택
    const projection = d3
      .geoMercator()
      .scale(initialScale)
      .translate([initialX, initialY]);
    console.log("projection: ", projection);

    const path = d3.geoPath().projection(projection);
    console.log("path: ", path);

    // 지도를 그릴 svg
    const svg = d3
      .select(target)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "map")
      .attr("class", "map");

    // 지도가 그려지는 그래픽 노드(g) 생성
    const states = svg.append("g").attr("id", "states");

    states
      .append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);

    states
      .selectAll("path")
      .data(MAP_GEOSON.features)
      .enter()
      .append("path")
      .attr("d", path);
  };

  useEffect(() => {
    drawMap("#map-wrapper");
  }, []);

  return (
    <div>
      <span>trip 페이지</span>
      <div id="map-wrapper"></div>
    </div>
  );
};

export default Trip;
