import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isCollapsed ? (
          <img src="/hamburger.svg" alt=">" className="hamburger-icon" />
        ) : (
          <div className="cancel-outer">
          <img src="/cancel.svg" alt="<" className="cancel-icon" />
          </div>
        )}
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <Link to="/">
            <div className="menu">
              <span>
                <img
                  src="/dashboard.svg"
                  alt="dashboard"
                  className="svg-dashboard"
                />
              </span>
              {!isCollapsed && <span>Dashboard</span>}
            </div>
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/assets">
            <div className="menu">
              <span>
                <img src="/asset.svg" alt="assets" className="svg-asset" />
              </span>
              {!isCollapsed && <span>Assets</span>}
            </div>
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/tickets">
            <div className="menu">
              <span>
                <img src="/tickets.svg" alt="tickets" className="svg-ticket" />
              </span>
              {!isCollapsed && <span>Tickets</span>}
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
