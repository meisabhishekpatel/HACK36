import React, { useState } from 'react';

const AccidentWitnessed = () => {
  const [witnessedAccident, setWitnessedAccident] = useState(null);

  const handleYesClick = () => {
    setWitnessedAccident(true);
  };

  const handleNoClick = () => {
    setWitnessedAccident(false);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h3 style={{ fontSize: '1.2em' }}>Did you witness any accident around this region?</h3>
      {witnessedAccident === null && (
        <div style={{ marginTop: '20px' }}>
          <button
            style={{
              backgroundColor: '#4CAF50',
              border: 'none',
              color: 'white',
              padding: '15px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              transitionDuration: '0.4s',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
            onClick={handleYesClick}
          >
            YES
          </button>
          <button
            style={{
              backgroundColor: '#4CAF50',
              border: 'none',
              color: 'white',
              padding: '15px 32px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              transitionDuration: '0.4s',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
            onClick={handleNoClick}
          >
            NO
          </button>
        </div>
      )}
      {witnessedAccident !== null && (
        <p style={{ marginTop: '20px', fontSize: '1.1em' }}>
          You {witnessedAccident ? 'witnessed an accident and your response will be recorded in dataset after careful checks.' : 'did not witness an accident.'} 
        </p>
      )}
    </div>
  );
};

export default AccidentWitnessed;
