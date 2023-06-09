import React, { useState, useEffect } from 'react';
import { DeployModelContext } from './useContext/DeployModelContext';
import axios from 'axios';
import apiConfig from './apiConfig/apiConfig';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([1,2,3]);

  function updateValue(newValue) {
    setValue(newValue);
  }

  const contextValue = {
    value,
    setValue: updateValue,
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${apiConfig.vercelURL}/deployed`);
      setData(result.data);
      setValue(result.data);
    };
    fetchData();
  }, []);
  return <DeployModelContext.Provider value={contextValue}>{children}</DeployModelContext.Provider>;
}

export default MyProvider;