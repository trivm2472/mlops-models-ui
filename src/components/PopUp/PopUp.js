import React, { useState } from "react";
import "./Popup.css"; // Import the CSS file for styling

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your submit logic here
    console.log("Username:", username);
    console.log("Password:", password);
    setUsername("");
    setPassword("");
    setIsOpen(false);
  };

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
      >
        Deploy
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
