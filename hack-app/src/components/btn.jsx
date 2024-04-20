import React, { useState } from 'react';

function EmergencyButton() {
  const [callingMom, setCallingMom] = useState(false);

  const handleClick = () => {
    setCallingMom(true);
    // Simulating an API call or some action
    setTimeout(() => {
      setCallingMom(false);
    }, 3000); // Resetting after 3 seconds
  };

  return (
    <div className="btn-container">
      {callingMom ? (
        <p>Calling nearby Police Station...</p>
      ) : (
        <button className="emergency-btn" onClick={handleClick}>
          Press this on emergency
        </button>
      )}
      <style jsx>{`
        .btn-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        .emergency-btn {
          width: 200px;
          padding: 10px 20px;
          background-color: #ff6347; /* Tomato color */
          border: 2px solid #ff6347;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s, border-color 0.3s;
        }

        .emergency-btn:hover {
          background-color: #ff7f50; /* Coral color */
          border-color: #ff7f50;
        }
      `}</style>
    </div>
  );
}

export default EmergencyButton;
