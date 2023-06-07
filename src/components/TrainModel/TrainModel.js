import { useEffect } from "react";
import axios from "axios";
import { useState, useContext } from "react";
import homeIcons from "../../images/home.png";
import "./TrainModel.css";
import JenkinsConfig from "../../jenkinsconfig/JenkinsConfig";
import apiConfig from "../../apiConfig/apiConfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function TrainModel() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [modelName, setModelName] = useState(name == '0' ? '' : name);
  const [dataUrl, setDataUrl] = useState('');
  const [img, setImg] = useState('480');
  const [batch, setBatch] = useState('1');
  const [epoch, setEpoch] = useState('1');
  const [weight, setWeight] = useState('yolov5n.pt');
  const { pathname } = useLocation();
  const [nameDisable, setNameDisable] = useState(false)

  const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState(false);

    const togglePopup = () => {
      if (modelName == '' || dataUrl == '' || img == '' || batch == '' || epoch == '' || weight == ''){
        alert('Please input all of the field');
        return;
      }
      setIsOpen(!isOpen);
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
          
          // jenkins api here
          // const jenkinResponse = await axios.post(
          //   `${JenkinsConfig.jenkinsURL}/job/${JenkinsConfig.trainJob}/job/main/buildWithParameters?MODEL_NAME=${modelName}&DATA_URL=${dataUrl}&IMG=${img}&BATCH=${batch}&EPOCH=${epoch}&WEIGHT=${weight}`,
          //   {}
          // );

          const apiResponse = await axios.get(`${apiConfig.vercelURL}/train/${modelName}`)
          setIsOpen(!isOpen);
          alert('Build request has been sent');
          navigate('/');
          
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
            marginTop: 30,
            marginBottom: 50,
            marginLeft: 20,
            paddingLeft: 20,
            paddingRight: 20,
            height: 45,
            fontSize: 24,
            borderRadius: 5,
            borderWidth: 1.2,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#4593C6",
          }}
          disabled={false}
          className={"build-button"}
        >
          {"Build"}
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if(name != '0'){
      setNameDisable(true);
    }
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
          Train new model
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
      <div className="container" style={{ marginLeft: "5%" }}>
        <div className="param" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 24, fontWeight: "500" }}>MODEL_NAME</div>
          <div
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 13,
              marginBottom: 18,
            }}
          >
            The name for the model
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: 30,
              borderRadius: 5,
              borderWidth: 1.2,
              fontSize: 20,
              paddingLeft: 8,
            }}
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            disabled={nameDisable}
          />
        </div>
        <div className="param" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 24, fontWeight: "500" }}>DATA_URL</div>
          <div
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 13,
              marginBottom: 18,
            }}
          >
            The URL to load the dataset from Roboflow
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: 30,
              borderRadius: 5,
              borderWidth: 1.2,
              fontSize: 20,
              paddingLeft: 8,
            }}
            value={dataUrl}
            onChange={(e) => setDataUrl(e.target.value)}
          />
        </div>
        <div className="param" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 24, fontWeight: "500" }}>IMG</div>
          <div
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 13,
              marginBottom: 18,
            }}
          >
            The image size for training. Example 480
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: 30,
              borderRadius: 5,
              borderWidth: 1.2,
              fontSize: 20,
              paddingLeft: 8,
            }}
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="param" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 24, fontWeight: "500" }}>BATCH</div>
          <div
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 13,
              marginBottom: 18,
            }}
          >
            The number to build at a time. Example 1
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: 30,
              borderRadius: 5,
              borderWidth: 1.2,
              fontSize: 20,
              paddingLeft: 8,
            }}
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </div>
        <div className="param" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 24, fontWeight: "500" }}>EPOCH</div>
          <div
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 13,
              marginBottom: 18,
            }}
          >
            The number of training for model. Example 1
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: 30,
              borderRadius: 5,
              borderWidth: 1.2,
              fontSize: 20,
              paddingLeft: 8,
            }}
            value={epoch}
            onChange={(e) => setEpoch(e.target.value)}
          />
        </div>
        <div className="param" style={{ marginTop: 40 }}>
          <div style={{ fontSize: 24, fontWeight: "500" }}>WEIGHT</div>
          <div
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 13,
              marginBottom: 18,
            }}
          >
            The weight to start traing from. Example yolov5l.pt
          </div>
          <input
            type="text"
            style={{
              width: "90%",
              height: 30,
              borderRadius: 5,
              borderWidth: 1.2,
              fontSize: 20,
              paddingLeft: 8,
            }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        {/* <button
          style={{
            marginTop: 30,
            marginBottom: 50,
            marginLeft: 20,
            paddingLeft: 20,
            paddingRight: 20,
            height: 45,
            fontSize: 24,
            borderRadius: 5,
            borderWidth: 1.2,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#4593C6",
          }}
          onClick={() => {
            console.log(modelName, dataUrl, img, batch, epoch, weight);
          }}
        >
          Build
        </button> */}
        <Popup/>
      </div>
    </div>
  );
}
