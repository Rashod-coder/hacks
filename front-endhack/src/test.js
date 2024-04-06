import React, { useState } from 'react';
import './App.css';

function Test() { // Changed function name to start with uppercase letter
  const [formData, setFormData] = useState({
    pounds: '',
    dayOfWeek: '',
    seasonalYield: ''
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const predictPrice = async () => {
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setPrediction(data.prediction.toFixed(2));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="test">
      <h1>Carrot Price Prediction</h1>
      <label htmlFor="pounds">Pounds:</label>
      <input type="number" id="pounds" name="pounds" value={formData.pounds} onChange={handleChange} step="0.01" /><br />
      <label htmlFor="dayOfWeek">Day of Week (0-6):</label>
      <input type="number" id="dayOfWeek" name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} min="0" max="6" /><br />
      <label htmlFor="seasonalYield">Seasonal Yield (tons):</label>
      <input type="number" id="seasonalYield" name="seasonalYield" value={formData.seasonalYield} onChange={handleChange} step="0.01" /><br />
      <button onClick={predictPrice}>Predict</button><br />
      {prediction && <p>Predicted price: ${prediction}</p>}
    </div>
  );
}

export default Test; // Export the component properly
