import styled from "styled-components";
import * as d3 from "d3";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { geoPath } from "d3-geo";
import MAP_GEOSON from "../../components/common/map.geo.json";

const Path = styled.path<{ myCode: number; activeCode: number }>`
  stroke: ${(props) =>
    props.myCode === props.activeCode ? "red" : "transparent"};
  cursor: pointer;
  &:hover {
    stroke: red;
  }
`;

interface Props {
  activeRegion: number;
  onClick: (
    e: React.MouseEvent<SVGPathElement>,
    id: number,
    d: Feature<Geometry, GeoJsonProperties>
  ) => void;
}

const Nation = ({ activeRegion, onClick }: Props) => {
  const initialScale = 5500; //확대시킬 값
  const initialX = -11900; //초기 위치값 X
  const initialY = 4050; //초기 위치값 Y

  const projection = d3
    .geoMercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

  return (
    <svg width={700} height={700}>
      <g>
        {(MAP_GEOSON as FeatureCollection).features.map((d, i) => {
          let id = d.properties ? d.properties.SGG_Code : 0;

          return (
            <Path
              myCode={id}
              key={i}
              activeCode={activeRegion}
              d={geoPath().projection(projection)(d) as string}
              onClick={(e) => onClick(e, id, d)}
              stroke="transparent"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Nation;
