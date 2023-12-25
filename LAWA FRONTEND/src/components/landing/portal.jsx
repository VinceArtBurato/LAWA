import React from 'react';
import './portal.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Portal = () => {
  return (
    <div className="main-container">
      {/* Background Image */}
      <div className="background-image"></div>

      {/* Logo and Description */}
      <div className="logo-container">
        <img src="/resources/LawaLogo.png" alt="Blank Logo" />
      </div>

      <div className="text-center">
        <h1>Lake Apo Women’s Association Inc.</h1>
      </div>
      <div className="text-center1">
        <h3>Lake Apo, Gunuyoran, Valencia City, Bukidnon</h3>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <Link to="/adminLogin"> {/* Add Link and specify the "to" prop */}
          <button className="button" id="admin-button">Admin</button>
        </Link>
      </div>

      <div className="button-container1">
        <Link to="/employLogin"> {/* Add Link and specify the "to" prop */}
          <button className="button" id="employee-button">Employee</button>
        </Link>
      </div>
    </div>
  );
};

export default Portal;
