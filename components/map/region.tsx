import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import TripList from "../list/trip/tripList";
import * as d3 from "d3";

const DetailWrapper = styled.div<{ detail: boolean; addSection: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${({ detail }) => (detail ? "0" : "-100%")};
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s linear;
  z-index: 3;

  .close_wrapper {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    .close_btn {
      width: 100%;
      height: 100%;
      background-color: white;
      margin: 0 5px;
      border: none;
      cursor: pointer;
      padding: 0;
      margin: 0;
      background-image: url("/imgs/up-btn.svg");
      background-size: 26px;
      background-repeat: no-repeat;
      background-position: center;
      outline: none;
    }
  }

  .contents_wrapper {
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .list_section {
      width: ${({ addSection }) => (addSection ? "50%" : "100%")};
      height: 100%;
      transition: all 0.3s linear;

      .list {
      }

      .add_btn_wrapper {
        margin-top: 20px;

        .add_btn {
          cursor: pointer;
        }
      }
    }
    .add_section {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      top: 0;
      right: ${({ addSection }) => (addSection ? "0" : "-50%")};
      transition: all 0.3s linear;

      .add_close_btn_wrapper {
        width: 30px;
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
        text-align: right;

        .add_close_btn {
          width: 30px;
          height: 30px;
          background-image: url(/imgs/up-btn.svg);
          background-size: 30px;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 50%;
          transform: rotate(90deg);
          border: none;
          cursor: pointer;
        }
      }

      .add_form {
        width: 50%;
        height: 50%;
        border: 1px solid black;
      }
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
  // popup
  const [active, setActive] = useState<boolean>(false);
  // form
  const [addSection, setAddSection] = useState<boolean>(false);

  const detailRef = useRef<SVGPathElement>(null);

  const onDetailClick = () => {
    setActive(true);
  };

  const openAddSection = () => {
    setAddSection(true);
  };

  const closeAddSection = () => {
    setAddSection(false);
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
    <DetailWrapper detail={detail} addSection={addSection}>
      <div className="close_wrapper">
        <button className="close_btn" onClick={onCloseDetail}></button>
      </div>

      <div className="contents_wrapper">
        <section className="list_section">
          <div className="list">
            <ul>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
              <li>aaaaa</li>
            </ul>
          </div>
          <div className="add_btn_wrapper">
            <button className="add_btn" onClick={openAddSection}>
              추가
            </button>
          </div>
        </section>

        <section className="add_section">
          <div className="add_close_btn_wrapper">
            <button
              className="add_close_btn"
              onClick={closeAddSection}
            ></button>
          </div>

          <form className="add_form">
            <div>
              <label htmlFor="title">Title</label>
              <input id="title" />
            </div>
            <div>
              <label htmlFor="address">주소</label>
              <input id="address" />
            </div>
          </form>
        </section>
      </div>

      {/* <DetailSection>
        <DetailSvg width={700} height={700} viewBox="0 0 700 700">
          <DetailG>
            <DetailPath
              id="detail-path"
              ref={detailRef}
              onClick={onDetailClick}
            />
          </DetailG>
        </DetailSvg>
      </DetailSection> */}
    </DetailWrapper>
  );
};

export default Region;
