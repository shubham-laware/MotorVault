import React from "react";

function Dashboard() {
  return (
    <div className="c-layout">
      <div className="c-nav">
        <h3>DASHBOARD</h3>
      </div>
      <div className="c-content">
        <div className="overview">
          <div className="overview-cards">
            <div className="overview-card">
              <h1>25</h1>
              <p>Total Assets</p>
            </div>
            <div className="overview-card">
              <h1>20</h1>
              <p>Operational</p>
            </div>
            <div className="overview-card">
              <h1>3</h1>
              <p>Under Maintenance</p>
            </div>
            <div className="overview-card">
              <h1>2</h1>
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
                <li>
                  {" "}
                  Motor 14 under maintainence dk skskkkkk
                  
                </li>
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
          </div> <div className="recent-activity-layout">
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
