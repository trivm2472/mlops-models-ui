import React from "react";
import arrowicons from "../../images/arrowdown-black.png";
import "./ModelListItem.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ModelListItem({ name, versionArray }) {
  function VersionItem({ versionId, date, modelId }) {
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
      </div>
    );
  }
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState(90);

  const handleClick = () => {
    if (rotation == 90) {
      setRotation(rotation - 90);
    }
    else {
      setRotation(rotation + 90);
    }
    
  };
  return (
    <div
      style={{
        width: "85%",
        margin: "auto",
        marginTop: 50,
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
          borderBottomStyle: "solid",
          borderBottomColor: "gray",
          borderBottomWidth: 1.2
        }}
        onClick={() => {
          setOpen(!open);
          handleClick()
        }}
      >
        <div
          style={{ fontSize: 36, fontWeight: 700, marginLeft: "5%", flex: 10, color: '#655DBB' }}
        >
          {name}
        </div>
        <img
          className="arrow"
          src={arrowicons}
          style={{ marginRight: "5%", transform: `rotate(${rotation}deg)`, width: 40, height: 40 }}
        />
      </div>

      <div
        className={`content`}
        style={{
          marginTop: 20,
          borderStyle: "solid",
          borderColor: "black",
          backgroundColor: "#C8EDE8",
          borderRadius: 30,
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
          <div style={{ flex: 3, marginLeft: "2.5%", color: "#808388" }}>
            Version
          </div>
          <p style={{ flex: 2, textAlign: "center", color: "#808388" }}>
            Date added
          </p>
        </div>
        {versionArray.map((item, key) => {
          return (
            <VersionItem
              versionId={item.version}
              date={item.date}
              modelId={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}
