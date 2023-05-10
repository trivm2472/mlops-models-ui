import ModelListItem from "../ModelListItem/ModelListItem";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleClick = () => {
    var temp = [];
    console.log(data);
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
    };

    fetchData();
  }, []);
  return (
    <>
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
            marginLeft: "15%",
            backgroundColor: "#d1dbca",
            width: "60%",
            height: 35,
            borderRadius: 5,
            fontSize: 20,
            borderWidth: 1.2,
          }}
          placeholder="Search for trained model"
          onChange={handleChange}
        />
        <input
          className="search-button"
          type="button"
          value="OK"
          style={{
            height: 40,
            width: 90,
            marginLeft: 30,
            borderRadius: 5,
            borderWidth: 1.2,
            backgroundColor: "#56DCB0",
          }}
          onClick={handleClick}
        />
      </div>
      <div
        style={{
          marginLeft: 75,
          marginTop: 40,
          marginBottom: -20,
          fontSize: 40,
          fontWeight: "500",
          color: "#464646",
        }}
      >
        Trained ML model in MLops system:
      </div>
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
            />
          );
        })
      )}
      {/* {searchData.map((item, key) => {
        item = item.sort((a, b) => -a.binDate + b.binDate);
        return (
          <ModelListItem
            name={item[0].modelName}
            key={key}
            versionArray={item}
          />
        );
      })} */}
    </>
  );
}
