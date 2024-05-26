import React from 'react';
import Sidebar from '../components/Sidebar';

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;