import homeIcons from "../../images/home.png";
import { useNavigate, useParams } from "react-router-dom";
import "./Monitor.css";
import { useState, useEffect } from "react";
import axios from "axios";
import apiConfig from "../../apiConfig/apiConfig";


export default function Monitor() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${apiConfig.vercelURL}/monitor/${name}`);
      var result2 = [];
      for(let i = 0; i < result.data.length; i++){
        var temp = JSON.parse(result.data[i].monitorResult);
        for(let j = 0; j < temp.length; j++){
          var element = {
            version: result.data[i].version,
            date: result.data[i].date,
            className: temp[j] ? temp[j].className : "null",
            class: temp[j] ? temp[j].class : "null",
            confidence: temp[j] ? temp[j].confidence : "null",
          }
          result2.push(element);
        }
      }
      console.log(result2);
      setData(result2);
    };

    fetchData();
  }, []);
  return (
    <div>
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
          {name} - Monitor
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
      {data.length == 0 ? (
        <table
          className="my-table"
          style={{ marginTop: 50, width: "90%", marginLeft: "5%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Version</th>
              <th style={{ width: "15%" }}>Date</th>
              <th style={{ width: "11%" }}>Class</th>
              <th style={{ width: "42%" }}>Class Name</th>
              <th style={{ width: "17%" }}>Conf</th>
            </tr>
          </thead>
          <tbody style={{height: 30}}>
            <tr className="blue-row" >
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table
          className="my-table"
          style={{ marginTop: 50, width: "90%", marginLeft: "5%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Version</th>
              <th style={{ width: "15%" }}>Date</th>
              <th style={{ width: "11%" }}>Class</th>
              <th style={{ width: "42%" }}>Class Name</th>
              <th style={{ width: "17%" }}>Conf</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                className={index % 2 === 0 ? "blue-row" : "red-row"}
                key={index}
              >
                <td>{item.version}</td>
                <td>{item.date ? item.date : 'null'}</td>
                <td>{item.class}</td>
                {/* <td>{item.monitorResult.className}</td> */}
                <td>{item.className ? item.className : 'null'}</td>
                <td>{item.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
