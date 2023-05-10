import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backicon from "../../images/back-button.png";
import { useNavigate } from "react-router-dom";
import "./Model.css";
import arrowicons from "../../images/arrowdown-black.png";

export default function Model() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(-90);

  const handleClick = () => {
    if (rotation == -90) {
      setRotation(rotation + 90);
    } else {
      setRotation(rotation - 90);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:4000/model/${id}`);
      result.data[0].resultFile = JSON.parse(result.data[0].resultFile);
      setData(result.data[0]);
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div style={{ marginLeft: 90, display: "flex", flexDirection: "row" }}>
      <div style={{ flexBasis: "80%" }}>
        <span
          style={{ display: "flex", alignItems: "baseline", marginBottom: -20 }}
        >
          <h2 style={{ marginRight: 15 }}>Model name: </h2>
          <h1 style={{ fontWeight: "600" }}>{data ? data.modelName : ""}</h1>
        </span>
        <h2>Version: {data ? data.version : ""}</h2>
        <h2>Parameters:</h2>
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
        {/* <h2>Last update: {data ? data.date : ''}</h2> */}
        <h2>Train result:</h2>
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
          <div style={{ fontSize: 24, fontWeight: 700 }}>Advanced result:</div>
        </div>
        <div
          style={{ display: open ? "" : "none", marginBottom: open ? 0 : 150 }}
        >
          <pre style={{ fontSize: 20, fontWeight: "700" }}>
            {JSON.stringify(data.resultFile, null, 2)}
          </pre>
        </div>
        <h2>Last update: {data ? data.date : ""}</h2>
      </div>
      <div style={{ flexBasis: "20%" }}>
        <img
          src={backicon}
          style={{ width: 50, height: 50, marginTop: 20 }}
          onClick={() => navigate(`/`)}
        />
      </div>
    </div>
  );
}
