import homeIcons from "../../images/home.png";
import { useNavigate, useParams } from "react-router-dom";
import "./Monitor.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Monitor() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     version: "1.0",
  //     date: "2022-05-01",
  //     class: "Math",
  //     className: "Calculus",
  //     conf: "90%",
  //   },
  //   {
  //     version: "1.1",
  //     date: "2022-05-15",
  //     class: "Science",
  //     className: "Physics",
  //     conf: "85%",
  //   },
  //   {
  //     version: "1.2",
  //     date: "2022-06-01",
  //     class: "English",
  //     className: "Grammar",
  //     conf: "95%",
  //   },
  //   {
  //     version: "1.3",
  //     date: "2022-06-15",
  //     class: "History",
  //     className: "World War II",
  //     conf: "87%",
  //   },
  // ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:4000/monitor/${name}`);
      setData(result.data);
      console.log(data);
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
                <td>{item.monitorResult.date}</td>
                <td>{item.monitorResult.class}</td>
                <td>{item.monitorResult.className}</td>
                <td>{item.monitorResult.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
