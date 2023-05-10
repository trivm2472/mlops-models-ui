import './App.css';
import ModelListItem from './components/ModelListItem/ModelListItem';
import Home from './components/Home/Home';
import ReactDOM from "react-dom/client";
import Model from './components/Model/Model';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { version } from 'react';
import { useParams } from "react-router-dom"

function App() {
  return (
    <>
    <div className='header' style={{fontSize: 48, textAlign: 'center', fontWeight: 700}}>MLops models tracking UI</div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
          <Route path='model/:id' element={<Model />} /> 
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
