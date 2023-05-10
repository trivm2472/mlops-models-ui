import ModelListItem from "../ModelListItem/ModelListItem";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000");
      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <>
      {/* <ModelListItem name='My test model'/>
      <ModelListItem name='Model 2'/>
      <ModelListItem name='Complete model'/> */}
      {data.map((item, key) => {
        item = item.sort((a, b) => -a.binDate + b.binDate);
        return <ModelListItem name={item[0].modelName} key={key} versionArray={item}/>;
      })}
    </>
  );
}
