import React from "react";
import "../css/assetinfo.css";
import { useLocation } from "react-router-dom";

function AssetInfo() {

  const location = useLocation();
  const asset = location.state?.asset;
  return (
    <div className="c-layout">
      <div className="c-nav">
        <h3>INFO</h3>
      </div>
      <div className="c-content">
        <h3 className="assetinfo-name">{asset.name}</h3>
        <p className="asset-description">
          {" "}
          {asset.description}
        </p>

        <div className="asset-info-container">
          <ul className="asset-ul">
            <li>
              <div className="asset-title">
                <span> Motor ID</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.motorID}</div>
            </li>

            <li>
              <div className="asset-title">
                <span>Model Number</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.modelNo}</div>
            </li>

            <li>
              <div className="asset-title">
                <span>Serial Number</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.serialNo}</div>
            </li>

            <li>
              <div className="asset-title">
                <span>Location</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.location}</div>
            </li>

            <li>
              <div className="asset-title">
                <span>Manufacturer</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.manufacturer}</div>
            </li>

            <li>
              <div className="asset-title">
                <span>Installation Date</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.installationDate}</div>
            </li>

            <li>
              <div className="asset-title">
                <span>Last Maintenance Date</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.maintainenceDate}</div>
            </li>

            <li>
              <div className="asset-title">
                <span> Status</span> <span>:</span>
              </div>
              <div className="asset-value">{asset.status}</div>
            </li>
          </ul>

          <div className="specifications">
            <div className="abc">
            <ul className="specifications-ul">
            <div className="specification-title">Specifications</div>
              <li>
                <div className="spec-title">
                  <span>Power</span> <span>:</span>
                </div>
                <div className="spec-value">{asset.power} kW</div>
              </li>

              <li>
                <div className="spec-title">
                  <span>Voltage</span> <span>:</span>
                </div>
                <div className="spec-value">{asset.voltage} V</div>
              </li>

              <li>
                <div className="spec-title">
                  <span>Current</span> <span>:</span>
                </div>
                <div className="spec-value">{asset.current} A</div>
              </li>

              <li>
                <div className="spec-title">
                  <span>Speed</span> <span>:</span>
                </div>
                <div className="spec-value">{asset.speed} RPM</div>
              </li>
              
            </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetInfo;
