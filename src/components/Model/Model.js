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
  const [trainResult, setTrainResult] = useState([]);

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
      console.log(result.data[0]);
      setData(result.data[0]);
      result.data[0].resultFile = JSON.parse(result.data[0].resultFile);
      result.data[0].outputFile.train_result = Object.keys(
        result.data[0].outputFile.train_result
      ).map((key) => {
        result.data[0].outputFile.train_result[key].Name = key;
        return result.data[0].outputFile.train_result[key];
      });
      
      setData(result.data[0]);
      setTrainResult(result.data[0].outputFile.train_result);
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
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 48,
            textAlign: "center",
            fontWeight: 700,
            color: "#FFFFFF",
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          MLops models monitoring UI
        </div>
        <img
          src={homeIcons}
          style={{
            width: 60,
            height: 60,
            textAlign: "right",
            marginTop: 5,
            marginRight: 30,
            position: "absolute",
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
              <h3>{data ? data.img : "null"}</h3>
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
              <h3>{data ? data.batch : "null"}</h3>
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
              <h3>{data ? data.epochs : "null"}</h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ marginRight: 22 }}>- Data url:</h3>
              <h3>{data.dataUrl ? data.dataUrl : "null"}</h3>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: -5,
                marginLeft: 20,
              }}
            >
              <h3 style={{ marginRight: 22 }}>- Weight file:</h3>
              <h3>{data.weightFile ? data.weightFile : "null"}</h3>
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
            {/* Train result here */}
            {trainResult.length == 0 ? (
              <div></div>
            ) : (
              <table
                className="my-table"
                style={{ marginTop: 20, width: "110%", marginLeft: "5%" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Name</th>
                    <th style={{ width: "10%" }}>Images</th>
                    <th style={{ width: "11%" }}>Instances</th>
                    <th style={{ width: "18%" }}>P</th>
                    <th style={{ width: "18%" }}>R</th>
                    <th style={{ width: "17%" }}>mAP50</th>
                    <th style={{ width: "16%" }}>mAP50-95</th>
                  </tr>
                </thead>
                <tbody>
                  {trainResult.map((item, index) => (
                    <tr
                      className={index % 2 === 0 ? "blue-row" : "red-row"}
                      key={index}
                    >
                      <td>{item.Name ? item.Name : "null"}</td>
                      <td>{item["Images  "] ? item["Images  "] : "null"}</td>
                      <td>{item.Instances ? item.Instances : "null"}</td>
                      {/* <td>{item.monitorResult.className}</td> */}
                      <td>{parseFloat(item.P.toFixed(15)).toString().replace(/(\.[0-9]*[1-9])0+$/, "$1")}</td>
                      <td>{parseFloat(item.R.toFixed(15)).toString().replace(/(\.[0-9]*[1-9])0+$/, "$1")}</td>
                      <td>{parseFloat(item.mAP50.toFixed(15)).toString().replace(/(\.[0-9]*[1-9])0+$/, "$1")}</td>
                      <td>{parseFloat(item["mAP50-95"].toFixed(15)).toString().replace(/(\.[0-9]*[1-9])0+$/, "$1")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
              Advanced parameter:
            </div>
          </div>
          <div style={{ display: open ? "" : "none" }}>
            <pre style={{ fontSize: 20, fontWeight: "700" }}>
              {JSON.stringify(data.resultFile, null, 2)}
            </pre>
          </div>
          <h2 style={{ marginTop: 30 }}>
            Update date: {data ? data.date : ""}
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
