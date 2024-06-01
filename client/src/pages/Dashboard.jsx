import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalAssets: "",
    operational: "",
    underMaintainence: "",
    inactive: "",
  });

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await axios.get("https://motorvault.onrender.com/api/v1/assets");
        if (response.status === 200) {
          const assets = response.data.assets;
          const totalAssets = assets.length;
          const operational = assets.filter(
            (asset) => asset.status === "Operational"
          ).length;
          const underMaintainence = assets.filter(
            (asset) => asset.status === "Under Maintainence"
          ).length;
          const inactive = assets.filter(
            (asset) => asset.status === "Inactive"
          ).length;

          setDashboardData({
            totalAssets,
            operational,
            underMaintainence,
            inactive,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    };

    fetchAssetData();
  }, []);

  return (
    <div className="c-layout">
      <div className="c-nav">
        <h3>DASHBOARD</h3>
      </div>
      <div className="c-content">
        <div className="overview">
          <div className="overview-cards">
            <div className="overview-card">
              <h1>{dashboardData.totalAssets}</h1>
              <p>Total Assets</p>
            </div>
            <div className="overview-card">
              <h1>{dashboardData.operational}</h1>
              <p>Operational</p>
            </div>
            <div className="overview-card">
              <h1>{dashboardData.underMaintainence}</h1>
              <p>Under Maintenance</p>
            </div>
            <div className="overview-card">
              <h1>{dashboardData.inactive}</h1>
              <p>Inactive</p>
            </div>
          </div>
        </div>
        <h2 className="recent-activity-text">Recent Activity</h2>

        <div className="recent-activity-container">
          <div className="recent-activity-layout">
            <div className="date">26/05/2024</div>
            <div className="recent-activity">
              <ul className="activity-list">
                <li>New ticket added</li>
                <li> Motor 14 under maintainence dk skskkkkk</li>
                <li>New ticket added</li>
              </ul>
            </div>
          </div>
          <div className="recent-activity-layout">
            <div className="date">25/05/2024</div>
            <div className="recent-activity">
              <ul className="activity-list">
                <li>New ticket added</li>
                <li>Motor 14 under maintainence</li>
                <li>New ticket added</li>
              </ul>
            </div>
          </div>
          <div className="recent-activity-layout">
            <div className="date">21/05/2024</div>
            <div className="recent-activity">
              <ul className="activity-list">
                <li>Ticket id-1234 closed</li>
                <li>New ticket added</li>
                <li>New ticket added</li>
              </ul>
            </div>
          </div>
          
          
          <div className="recent-activity-layout">
            <div className="date">20/05/2024</div>
            <div className="recent-activity">
              <ul className="activity-list">
                <li>Ticket id-1234 closed</li>
                <li>New ticket added</li>
                <li>New ticket added</li>
              </ul>
            </div>
          </div>
          <div className="recent-activity-layout">
            <div className="date">20/05/2024</div>
            <div className="recent-activity">
              <ul className="activity-list">
                <li>Ticket id-1234 closed</li>
                <li>New ticket added</li>
                <li>New ticket added</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
