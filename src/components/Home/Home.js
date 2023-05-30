import ModelListItem from "../ModelListItem/ModelListItem";
import { useEffect } from "react";
import axios from "axios";
import { useState, useContext } from "react";
import "./Home.css";
import { DeployModelContext } from "../../useContext/DeployModelContext";
import _ from "lodash";
import JenkinsConfig from "../../jenkinsconfig/JenkinsConfig";
import apiConfig from "../../apiConfig/apiConfig";




export default function Home() {
  const jenkinsUrl = ['https://jenkins.mlopshcmut.ngrok.app/job/MLOPS_BUILD_AND_DEPLOY_BACKEND/', 
  'https://jenkins.mlopshcmut.ngrok.app/job/MLOPS_DEPLOY/job/main/'];
  const [data, setData] = useState([]);
  const { value, setValue } = useContext(DeployModelContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [render, setRender] = useState(true);
  const [deployedData, setsetDeployedData] = useState([]);
  const [isDeployed, setIsDeployed] = useState(false);
  const [monitorUrl, setMonitorUrl] = useState(jenkinsUrl[0]);
  
  const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState(false);

    const togglePopup = () => {
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
      if (versionArr1.length == 0) return;
      if (_.isEqual(versionArr1, versionArr2)) {
        alert("Those models have already been deploy");
      } else setIsOpen(!isOpen);
    };

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const loginResult = await axios.post(
          `${apiConfig.vercelURL}/loginjenkins`,
          {
            username: username,
            password: password,
          }
        );
        console.log(loginResult.data.token);
        if (loginResult.data) {
          setUsername("");
          setPassword("");
          setIsOpen(false);
          setErrorMessage(false);
          // Login successfully

          // Start jenkins session
          axios.defaults.auth = {
            username: username,
            password: loginResult.data.token,
          };
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
          if (versionArr1.length == 0) return;
          if (_.isEqual(versionArr1, versionArr2)) {
            alert("Those models have already been deploy");
          } else if (1 == 2) {
          } else {
            try {

              // Jenkin api
              var modelNameString = "";
              var versionString = "";

              if (deployedData.length == 1) {
                modelNameString = deployedData[0].modelName;
                versionString = deployedData[0].version;
              } else {
                modelNameString = deployedData[0].modelName;
                versionString = deployedData[0].version;
                for (let i = 1; i < deployedData.length; i++) {
                  modelNameString += "," + deployedData[i].modelName;
                  versionString += "," + deployedData[i].version;
                }
              }

              console.log("modelNameString", modelNameString);
              console.log("versionString", versionString);
              // Check if image exist for model:
              const images = await axios.post(
                `${apiConfig.vercelURL}/deploy/getSaveImage`,
                {
                  versionList: versionString,
                  modelListName: modelNameString,
                }
              );

              console.log(images);

              if (images.data.length > 0) {
                // const jenkinResponse1 = await axios.post(
                //   `${JenkinsConfig.jenkinsURL}/job/${JenkinsConfig.job2}/job/main/buildWithParameters?IMAGE_NAME=${images.data[0].image}`,
                //   {}
                // );
                const response = await axios.post(
                  `${apiConfig.vercelURL}/deploy`,
                  {
                    modelIdList: versionArr1,
                    urlLink: jenkinsUrl[1],
                  }
                );
                // const deployedModel = await axios(
                //   `${apiConfig.vercelURL}/deployed`
                // );
                
                // setDeployedData(deployedModel.data);
                // setValue(deployedModel.data);
                setIsDeployed(true);
                setMonitorUrl(jenkinsUrl[1])
                alert("Deploying image");
                return;
              }
              const seqImage = await axios.get(`${apiConfig.vercelURL}/addImageSeq`)
              // const jenkinResponse2 = await axios.post(
              //   `${JenkinsConfig.jenkinsURL}/job/${JenkinsConfig.job}/buildWithParameters?MODEL_NAME=${modelNameString}&MODEL_VERSION=${versionString}&IMAGE_NAME=deployedImage${seqImage.data}`,
              //   {}
              // );
              // End jenkins session
              const response = await axios.post(
                `${apiConfig.vercelURL}/deploy`,
                {
                  modelIdList: versionArr1,
                  urlLink: jenkinsUrl[0],
                }
              );
              // const deployedModel = await axios(
              //   `${apiConfig.vercelURL}/deployed`
              // );
              
              // setDeployedData(deployedModel.data);
              // setValue(deployedModel.data);
              setMonitorUrl(jenkinsUrl[0])
              setIsDeployed(true);

              alert("Deploying model");
            } catch (error) {
              console.error(error);
              alert("Something went wrong");
            }
          }
        } else {
          // Incorrect username or password
          setErrorMessage(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <div>
        <button
          onClick={togglePopup}
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
          disabled={isDeployed}
          className={isDeployed ? "deploy-button" : ""}
        >
          {isDeployed ? 'Deploying...' : 'Deploy'}
        </button>
        {isOpen && (
          <div className="popup-container">
            <div className="popup">
              <span className="close" onClick={togglePopup}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <label>
                  Username:
                  <input
                    className="validation"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginLeft: 15 }}
                  />
                </label>
                <label>
                  Password:
                  <input
                    className="validation"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginLeft: 20 }}
                  />
                </label>
                <button type="submit">Submit</button>
                {error && <p className="error">Invalid username or password</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

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
      const result = await axios(`${apiConfig.vercelURL}`);
      setData(result.data);
      setSearchData(result.data);
      const deployedResult = await axios(`${apiConfig.vercelURL}/deployed`);
      const deployStatus = await axios.get(`${apiConfig.vercelURL}/deployStatus`);
      setMonitorUrl(deployStatus.data.urlLink);
      if (deployStatus.data.status != 'idle') {
        setIsDeployed(true);
        const temp = await axios.post(`${apiConfig.vercelURL}/getModelList`, {arrayId: deployStatus.data.currentIdList});
        setsetDeployedData(temp.data);
      } else {
        setDeployedData(deployedResult.data);
        setValue(deployedResult.data) // Dangerous
      }
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
        MLOps models tracking UI
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
                  isDeployed={isDeployed}
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: 20,
                paddingLeft: 30,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  flexBasis: "65%",
                  color: "#6D6F6F",
                  fontWeight: "700",
                }}
              >
                Model name
              </div>
              <div
                style={{
                  flexBasis: "35%",
                  color: "#6D6F6F",
                  fontWeight: "700",
                }}
              >
                Version
              </div>
            </div>
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
                  <div style={{ flexBasis: "65%" }}>{item.modelName}</div>
                  <div style={{ flexBasis: "35%" }}>{item.version}</div>
                </div>
              );
            })}
          </div>
          {/* <input
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
              if (versionArr1.length == 0) return;
              if (_.isEqual(versionArr1, versionArr2)) {
                alert("Those models have already been deploy");
              } else if (1 == 2) {
              } else {
                try {
                  const response = await axios.post(
                    `${apiConfig.vercelURL}/deploy`,
                    {
                      modelIdList: versionArr1,
                    }
                  );
                  const deployedModel = await axios(
                    `${apiConfig.vercelURL}/deployed`
                  );
                  setDeployedData(deployedModel.data);
                  setValue(deployedModel.data);

                  // Jenkin api
                  var modelNameString = "";
                  var versionString = "";

                  if (deployedData.length == 1) {
                    modelNameString = deployedData[0].modelName;
                    versionString = deployedData[0].version;
                  } else {
                    modelNameString = deployedData[0].modelName;
                    versionString = deployedData[0].version;
                    for (let i = 1; i < deployedData.length; i++) {
                      modelNameString += "," + deployedData[i].modelName;
                      versionString += "," + deployedData[i].version;
                    }
                  }

                  console.log("modelNameString", modelNameString);
                  console.log("versionString", versionString);
                  // Check if image exist for model:
                  const images = await axios.post(
                    `${apiConfig.vercelURL}/deploy/getSaveImage`,
                    {
                      versionList: versionString,
                      modelListName: modelNameString,
                    }
                  );

                  console.log(images);

                  if (images.data.length > 0) {
                    const jenkinResponse1 = await axios.post(
                      `${JenkinsConfig.jenkinsURL}/job/BUILD_BACKEND_IMAGE_MLOPS/job/main/buildWithParameters?
                      MODEL_NAME=${modelNameString}&MODEL_VERSION=${versionString}&IMAGE_NAME=${images.data[0].image}dp`,
                      {}
                    );
                    alert("deploying image");
                    return;
                  }
                  const jenkinResponse2 = await axios.post(
                    `${JenkinsConfig.jenkinsURL}/job/BUILD_BACKEND_IMAGE_MLOPS/job/main/buildWithParameters?
                    MODEL_NAME=${modelNameString}&MODEL_VERSION=${versionString}&IMAGE_NAME=imagename`,
                    {}
                  );
                  // End jenkin api

                  alert("models deploy successful");
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          /> */}
          <Popup />
          <div style={{display: isDeployed ? '' : 'none', marginTop: 20}}>
            <a href={monitorUrl} target="_blank" id="monitor-link" style={{fontSize: 20}} >
              Click here to monitor deployment
            </a>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 100 }}></div>
    </div>
  );
}
