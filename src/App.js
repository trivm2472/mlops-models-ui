import "./App.css";
import Home from "./components/Home/Home";
import Model from "./components/Model/Model";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monitor from "./components/Monitor/Monitor";
import { createContext } from "react";
import MyProvider from "./MyProvider";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = 'MLOps models tracking UI'; // Replace 'New Page Title' with your desired title
  }, []);
  return (
    <>
      {/* <div
        className="header2"
        style={{
          fontSize: 48,
          textAlign: "center",
          fontWeight: 700,
          color: "#FFFFFF",
          borderTopStyle: 'solid',
          borderBottomStyle: 'solid',
          borderColor: 'black',
          backgroundColor: '#4593C6',
          paddingBottom: 10
        }}
      >
        MLops models tracking UI
      </div> */}
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="model/:id" element={<Model />} />
            <Route path="monitor/:name" element={<Monitor />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </>
  );
}

export default App;
