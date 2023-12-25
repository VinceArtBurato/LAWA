import React from 'react';
import { Link } from 'react-router-dom';
const AdminDash = () => {
  return (      
<div>
      <iframe
        title="External Content"
        src="src\components\admin\dashboard\a_Dashboard\admin-index.html"
        style={{
            width: '100%',
            height: '100vh', // 100% of the viewport height
            border: 'none',  // Remove iframe border
          }}
      ></iframe>
    </div>

  );
  };

  export default AdminDash;