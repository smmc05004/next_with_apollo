import styled from "styled-components";
import * as d3 from "d3";
// import MAP_GEOSON from "../../components/common/korea.json";
import MAP_GEOSON from "../../components/common/map.geo.json";
import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { geoEqualEarth, geoPath } from "d3-geo";
import { Nation, Region } from "../../components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Trip = () => {
  const [activeRegion, setActiveRegion] = useState<number>(0);

  const initialScale = 5500; //확대시킬 값
  const initialX = -11900; //초기 위치값 X
  const initialY = 4050; //초기 위치값 Y

  const projection = d3
    .geoMercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

  const onClick = (
    e: React.MouseEvent<SVGPathElement>,
    id: number,
    d: Feature<Geometry, GeoJsonProperties>
  ) => {
    setActiveRegion(id);

    const detailPath = geoPath().projection(projection)(d) as string;

    d3.select("#detail-path")
      .attr("width", 700)
      .attr("height", 700)
      .attr("d", detailPath);
  };

  return (
    <div>
      <span>trip 페이지</span>
      <Wrapper id="map-wrapper">
        <Nation activeRegion={activeRegion} onClick={onClick} />
        <Region setActiveRegion={setActiveRegion} />
      </Wrapper>
    </div>
  );
};

export default Trip;
