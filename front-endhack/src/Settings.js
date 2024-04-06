import React from 'react';
import './Settings.css'; // Import the CSS file

function Settings() {
  return (
    <div className="settings-container ">
      <h1>Settings</h1>
      <p>This is where you can customize your preferences.</p>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" placeholder="Enter your email" />
      </div>
      <button>Save Changes</button>
    </div>
  );
}

export default Settings;
