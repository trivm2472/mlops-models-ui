import ModelListItem from "../ModelListItem/ModelListItem";
import { useEffect } from "react";
import axios from "axios";
import { useState, useContext } from "react";
import "./Home.css";
import { DeployModelContext } from "../../useContext/DeployModelContext";
import _ from "lodash";

export default function Home() {
  const [data, setData] = useState([]);
  const { value, setValue } = useContext(DeployModelContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [render, setRender] = useState(true);
  const [deployedData, setsetDeployedData] = useState([]);

  function setDeployedData(data) {
    setsetDeployedData(data);
  }

  const handleClick = () => {
    var temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i][0].modelName.includes(searchValue)) {
        temp.push(data[i]);
      }
    }
    setSearchData(temp);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000");
      setData(result.data);
      setSearchData(result.data);
      const deployedResult = await axios("http://localhost:4000/deployed");
      setDeployedData(deployedResult.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 2000 }}>
      <div
        className="header2"
        style={{
          fontSize: 48,
          textAlign: "center",
          fontWeight: 700,
          color: "#FFFFFF",
          borderTopStyle: "solid",
          borderBottomStyle: "solid",
          borderColor: "black",
          backgroundColor: "#4593C6",
          paddingBottom: 10,
        }}
      >
        MLops models tracking UI
      </div>
      <div
        style={{
          marginLeft: 75,
          marginTop: 20,
          marginBottom: 0,
          fontSize: 40,
          fontWeight: "500",
          color: "#464646",
        }}
      >
        Trained ML model in MLops system:
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          marginTop: 30,
          marginBottom: -15,
        }}
      >
        <input
          type="text"
          style={{
            marginLeft: "5%",
            backgroundColor: "#d1dbca",
            width: "80%",
            height: 35,
            borderRadius: 5,
            fontSize: 20,
            borderWidth: 1.2,
            height: 50,
            paddingLeft: 15,
          }}
          placeholder="Search for trained model"
          onChange={handleChange}
        />
        <input
          className="search-button"
          type="button"
          value="Search"
          style={{
            height: 50,
            width: 135,
            marginLeft: 30,
            borderRadius: 5,
            borderWidth: 1.2,
            backgroundColor: "#4593C6",
            color: "#FFFFFF",
            fontSize: 24,
          }}
          onClick={handleClick}
        />
      </div>
      <div
        className="home-content"
        style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
      >
        <div style={{ width: "60%" }}>
          {searchData.length == 0 ? (
            <div
              style={{
                justifyContent: "center",
                textAlign: "center",
                marginTop: 120,
                fontSize: 36,
                fontWeight: "500",
              }}
            >
              Can't find any model
            </div>
          ) : (
            searchData.map((item, key) => {
              item = item.sort((a, b) => -a.binDate + b.binDate);
              return (
                <ModelListItem
                  name={item[0].modelName}
                  key={key}
                  versionArray={item}
                  setRender={setRender}
                  setDeployedData={setDeployedData}
                  deployedData={deployedData}
                />
              );
            })
          )}
        </div>
        <div style={{ width: "38%", marginTop: 20 }}>
          <div
            style={{
              borderStyle: "solid",
              borderBottomStyle: "none",
              fontSize: 24,
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: "#4593C6",
              fontWeight: "bold",
              color: "#FFFFFF",
              borderColor: "black",
            }}
          >
            Model deploy list
          </div>
          <div
            className="model-deploy-table-content"
            style={{ borderStyle: "solid", minHeight: 100, paddingTop: 20 }}
          >
            {deployedData.map((item, key) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingLeft: 30,
                    marginBottom: 20,
                  }}
                  key={key}
                >
                  <div style={{ flexBasis: "65%" }}>- {item.modelName}</div>
                  <div style={{ flexBasis: "35%" }}>{item.version}</div>
                </div>
              );
            })}
          </div>
          <input
            className="deploy-button"
            type="button"
            value="Deploy"
            style={{
              width: "100%",
              marginTop: 30,
              height: 45,
              fontSize: 24,
              borderRadius: 5,
              borderWidth: 1.2,
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#4593C6",
            }}
            onClick={async () => {
              var arr1 = deployedData;
              var arr2 = value;
              arr1.sort((a, b) => a.id - b.id);
              arr2.sort((a, b) => a.id - b.id);
              var versionArr1 = [];
              var versionArr2 = [];
              for (let i = 0; i < arr1.length; i++) {
                versionArr1.push(arr1[i].id);
              }
              for (let i = 0; i < arr2.length; i++) {
                versionArr2.push(arr2[i].id);
              }
              if (_.isEqual(versionArr1, versionArr2)) {
                alert("Those models have already been deploy");
              } else {
                try {
                  const response = await axios.post(
                    "http://localhost:4000/deploy",
                    {
                      modelIdList: versionArr1,
                    }
                  );
                  const deployedModel = await axios(
                    "http://localhost:4000/deployed"
                  );
                  setDeployedData(deployedModel.data);
                  setValue(deployedModel.data);
                  alert("models deploy successful");
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          />
        </div>
      </div>
      <div style={{ marginBottom: 100 }}></div>
    </div>
  );
}
