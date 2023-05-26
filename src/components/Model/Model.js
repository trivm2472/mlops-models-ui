import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backicon from "../../images/back-arrow.png";
import { useNavigate } from "react-router-dom";
import "./Model.css";
import arrowicons from "../../images/arrowdown-black.png";
import homeIcons from "../../images/home.png";
import apiConfig from "../../apiConfig/apiConfig";

export default function Model() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [trainResultOpen, setTrainResultOpen] = useState(false);
  const [parameterOpen, setParameterOpen] = useState(false);
  const [rotation, setRotation] = useState(-90);
  const [trainResultrotation, setTrainResultRotation] = useState(-90);
  const [parameterrotation, setParameterRotation] = useState(-90);

  const handleClick = () => {
    if (rotation == -90) {
      setRotation(rotation + 90);
    } else {
      setRotation(rotation - 90);
    }
  };

  const handleTrainResultClick = () => {
    if (trainResultrotation == -90) {
      setTrainResultRotation(trainResultrotation + 90);
    } else {
      setTrainResultRotation(trainResultrotation - 90);
    }
  };

  const handleParameterClick = () => {
    if (parameterrotation == -90) {
      setParameterRotation(parameterrotation + 90);
    } else {
      setParameterRotation(parameterrotation - 90);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${apiConfig.vercelURL}/model/${id}`);
      result.data[0].resultFile = JSON.parse(result.data[0].resultFile);
      setData(result.data[0]);
    };

    fetchData();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderTopStyle: "solid",
          borderBottomStyle: "solid",
          borderColor: "black",
          backgroundColor: "#4593C6",
          justifyContent: "center",
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 48,
            textAlign: "center",
            fontWeight: 700,
            color: "#FFFFFF",
            paddingBottom: 10,
            textAlign: 'center',
          }}
        >
          MLops models tracking UI
        </div>
        <img
          src={homeIcons}
          style={{
            width: 60,
            height: 60,
            textAlign: 'right',
            marginTop: 5,
            marginRight: 30,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={() => navigate(`/`)}
        />
      </div>
      <div style={{ marginLeft: 90, display: "flex", flexDirection: "row" }}>
        <div style={{ flexBasis: "80%" }}>
          <span
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: -20,
            }}
          >
            <h2 style={{ marginRight: 15 }}>Model name: </h2>
            <h1
              style={{
                fontWeight: "600",
                fontFamily: "Roboto, sans-serif",
                marginLeft: 20,
              }}
            >
              {data ? data.modelName : ""}
            </h1>
          </span>
          <h2 style={{ marginBottom: 5 }}>
            Version: {data ? data.version : ""}
          </h2>
          <div
            className="header"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              marginBottom: 0,
            }}
            onClick={() => {
              setParameterOpen(!parameterOpen);
              handleParameterClick();
            }}
          >
            <img
              className="arrow"
              src={arrowicons}
              style={{
                marginRight: 20,
                transform: `rotate(${parameterrotation}deg)`,
                width: 24,
                height: 24,
              }}
            />
            <h2 style={{ color: "#212A3E" }}>Parameters:</h2>
          </div>
          <div style={{ display: parameterOpen ? "" : "none" }}>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ marginRight: 50 }}>- img:</h3>
              <h3>{data ? data.img : ""}</h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ marginRight: 35 }}>- batch:</h3>
              <h3>{data ? data.batch : ""}</h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ marginRight: 22 }}>- epochs:</h3>
              <h3>{data ? data.epochs : ""}</h3>
            </span>
          </div>
          <div
            className="header"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              marginBottom: 0,
            }}
            onClick={() => {
              setTrainResultOpen(!trainResultOpen);
              handleTrainResultClick();
            }}
          >
            <img
              className="arrow"
              src={arrowicons}
              style={{
                marginRight: 20,
                transform: `rotate(${trainResultrotation}deg)`,
                width: 24,
                height: 24,
              }}
            />
            <h2 style={{ color: "#212A3E" }}>Train result:</h2>
          </div>
          <div style={{ display: trainResultOpen ? "" : "none" }}>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- lr0:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.lr0 : ""}
              </h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- lrf:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.lrf : ""}
              </h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- momentum:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.momentum : ""}
              </h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- weight_decay:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.weight_decay : ""}
              </h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- warmup_epochs:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.warmup_epochs : ""}
              </h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- warmup_momentum:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.warmup_momentum : ""}
              </h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ flexBasis: "25%" }}>- warmup_bias_lr:</h3>
              <h3 style={{ flexBasis: "75%" }}>
                {data.resultFile ? data.resultFile.hyp.warmup_bias_lr : ""}
              </h3>
            </span>
          </div>
          <div
            className="header"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              marginBottom: 0,
              marginTop: 15,
            }}
            onClick={() => {
              setOpen(!open);
              handleClick();
            }}
          >
            <img
              className="arrow"
              src={arrowicons}
              style={{
                marginRight: 20,
                transform: `rotate(${rotation}deg)`,
                width: 24,
                height: 24,
              }}
            />
            <div style={{ fontSize: 24, fontWeight: 700, color: "#212A3E" }}>
              Advanced result:
            </div>
          </div>
          <div style={{ display: open ? "" : "none" }}>
            <pre style={{ fontSize: 20, fontWeight: "700" }}>
              {JSON.stringify(data.resultFile, null, 2)}
            </pre>
          </div>
          <h2 style={{ marginTop: 30 }}>
            Last update: {data ? data.date : ""}
          </h2>
        </div>
        {/* <div style={{ flexBasis: "20%" }}>
          <img
            src={backicon}
            style={{ width: 50, height: 50, marginTop: 20 }}
            onClick={() => navigate(`/`)}
          />
        </div> */}
      </div>
    </>
  );
}
