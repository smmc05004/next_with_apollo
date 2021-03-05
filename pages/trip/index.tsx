import styled from "styled-components";
import * as GeoJSON from "d3";
import * as d3 from "d3";
// import MAP_GEOSON from "../../components/common/korea.json";
import MAP_GEOSON from "../../components/common/map.geo.json";
import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import { Feature, FeatureCollection, Geometry } from "geojson";
import { geoEqualEarth, geoPath } from "d3-geo";

const Path = styled.path<{ myCode: number; activeCode: number }>`
  stroke: ${(props) =>
    props.myCode === props.activeCode ? "red" : "transparent"};
  cursor: pointer;
  &:hover {
    stroke: red;
  }
`;

const Trip = () => {
  const width = 700; //지도의 넓이
  const height = 700; //지도의 높이
  const initialScale = 5500; //확대시킬 값
  const initialX = -11900; //초기 위치값 X
  const initialY = 4050; //초기 위치값 Y
  let labels;

  const [active, setActive] = useState<number>(0);

  const projection = d3
    .geoMercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

  const onClick = (e: React.MouseEvent<HTMLOrSVGElement>, id: number) => {
    // console.log(e.target);
    console.log("id", id);
    console.log("클릭");
    setActive(id);
  };

  // const onwheel = () => {
  //   const zoomed = () => {
  //     console.log("zoom active");
  //   };

  //   const paths = d3.selectAll("path");
  //   paths.call(d3.zoom().on("zoom", zoomed));
  // };

  return (
    <div>
      <span>trip 페이지</span>
      <div id="map-wrapper">
        <svg width={700} height={700}>
          <g>
            {(MAP_GEOSON as FeatureCollection).features.map((d, i) => {
              let id = 0;

              if (d.properties) {
                id = d.properties.SGG_Code;
              }

              return (
                <Path
                  myCode={id}
                  activeCode={active}
                  key={i}
                  d={geoPath().projection(projection)(d) as string}
                  onClick={(e) => onClick(e, id)}
                  // onWheel={onwheel}
                  stroke="white"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Trip;
