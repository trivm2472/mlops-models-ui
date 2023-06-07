import React from "react";
import arrowicons from "../../images/arrowdown-black.png";
import "./ModelListItem.css";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeployModelContext } from "../../useContext/DeployModelContext";
import apiConfig from "../../apiConfig/apiConfig";

export default function ModelListItem({
  name,
  versionArray,
  setRender,
  setDeployedData,
  deployedData,
  isDeployed,
  keyToogle,
  setKeyToogle,
  trainingModel,
}) {
  const [checkedModelId, setCheckedModelId] = useState(-1);
  function VersionItem({ versionId, date, modelId, modelName }) {
    function checkDeployed() {
      if (checkedModelId == modelId) {
        return true;
      }
      return false;
    }
    function checkDisabled() {
      if (checkedModelId == modelId) {
        return false;
      }
      if (checkedModelId == -1) {
        return false;
      }
      return true;
    }
    var isCheckedInit = checkDeployed() ? true : false;
    const [isChecked, setIsChecked] = useState(isCheckedInit);

    function handleCheckboxChange() {
      if (checkedModelId == modelId) {
        var arr = deployedData;
        arr = arr.filter((obj) => {
          return obj.id != modelId;
        });
        setDeployedData(arr);
        setCheckedModelId(-1);
      } else {
        var arr = deployedData;
        var temp = { id: modelId, version: versionId, modelName: modelName };
        arr = [...arr, temp];
        setDeployedData(arr);
        setCheckedModelId(modelId);
      }
      setRender(true);

      setIsChecked(!isChecked);
    }
    useEffect(() => {
      for (let i = 0; i < deployedData.length; i++) {
        if (modelId == deployedData[i].id) {
          setCheckedModelId(modelId);
        }
      }
    }, []);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 0,
          marginBottom: 0,
          height: 30,
        }}
      >
        <Link
          to={`/model/${modelId}`}
          style={{
            flex: 3,
            marginLeft: "2.5%",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Version {versionId}
        </Link>
        <p style={{ flex: 2, textAlign: "center" }}>{date}</p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ flex: 3 }}
          disabled={checkDisabled() || isDeployed ? true : false}
        />
      </div>
    );
  }
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(90);
  const navigate = useNavigate();

  const handleClick = () => {
    if (rotation == 90) {
      setRotation(rotation - 90);
    } else {
      setRotation(rotation + 90);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: 20,
      }}
    >
      <div
        className="header"
        style={{
          height: 75,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
          borderStyle: "solid",
          borderColor: "gray",
          borderWidth: 1.2,
          backgroundColor: "#4593C6",
          borderRadius: 5,
        }}
      >
        <div
          className="arrow"
          style={{
            fontSize: 36,
            fontWeight: 700,
            marginLeft: "5%",
            flex: 10,
            color: "#FFFFFF",
          }}
          onClick={() => {
            setOpen(!open);
            handleClick();
          }}
        >
          {name}
        </div>
        <input
          className="monitor-button"
          type="button"
          value="Train"
          style={{
            marginRight: 20,
            fontSize: 24,
            paddingLeft: 16,
            paddingRight: 16,
            borderRadius: 5,
            backgroundColor: "#D9D9D9",
            borderWidth: 1.2,
          }}
          onClick={() => {
            navigate(`/train/${name}`);
          }}
        />
        <input
          className="monitor-button"
          type="button"
          value="Monitor"
          style={{
            marginRight: 20,
            fontSize: 24,
            paddingLeft: 16,
            paddingRight: 16,
            borderRadius: 5,
            backgroundColor: "#D9D9D9",
            borderWidth: 1.2,
          }}
          onClick={() => {
            navigate(`/monitor/${name}`);
          }}
        />
        <img
          className="arrow"
          src={arrowicons}
          style={{
            marginRight: "5%",
            transform: `rotate(${rotation}deg)`,
            width: 40,
            height: 40,
          }}
          onClick={() => {
            setOpen(!open);
            handleClick();
          }}
        />
      </div>

      <div
        className={`content`}
        style={{
          marginTop: 20,
          borderStyle: "solid",
          borderColor: "black",
          backgroundColor: "#C8EDE8",
          borderRadius: 5,
          paddingBottom: 10,
          border: 1,
          display: open ? "" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 3,
              marginLeft: "2.5%",
              color: "#808388",
              color: "black",
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Version
          </div>
          <p
            style={{
              flex: 2,
              textAlign: "center",
              color: "#808388",
              color: "black",
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Date added
          </p>
          <p
            style={{
              flex: 3,
              textAlign: "center",
              color: "#808388",
              color: "black",
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Deploying
          </p>
        </div>
        {versionArray.map((item, key) => {
          return (
            <VersionItem
              versionId={item.version}
              date={item.date}
              modelId={item.id}
              modelName={name}
            />
          );
        })}
      </div>
      {trainingModel.includes(name) ? (
        <div style={{ marginTop: 8 }}>
          <a
            href={apiConfig.trainStatus}
            target="_blank"
            id="monitor-link"
            style={{ fontSize: 16 }}
          >
            Model in training.... Click here to monitor
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
