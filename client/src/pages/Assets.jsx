import React, { useEffect, useRef, useState } from "react";
import "../css/assets.css";
import "../css/add-asset-modal.css";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate } from 'react-router-dom'

function Assets() {

  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  const [originalAsset, setOriginalAsset] = useState({});

  const [assetToDelete,setAssetToDelete] = useState('');

  const fetchAssets = async () => {
    try {
      const response = await axios.get("https://motorvault.onrender.com/api/v1/assets");
      if (response.status === 200) {
        const data = response.data.assets;
        setAssets(data);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const [asset, setAsset] = useState({
    name: "",
    description: "",
    motorID: "",
    manufacturer: "",
    modelNo: "",
    serialNo: "",
    installationDate: "",
    maintainenceDate: "",
    status: "Operational",
    location: "",
    power: "",
    voltage: "",
    current: "",
    speed: "",
  });

  

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);

  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);


  const openModal = (editData, e) => {
    e.stopPropagation();
    setIsOpen(true);

    if (editData !== null) {
      setIsEditMode(true);
      setAsset(editData);
      setOriginalAsset(editData);
    }

    document.body.classList.add("modal-open");
  };

  const openDeleteModal = (motorID,e)=>{
    e.stopPropagation();
    setAssetToDelete(motorID)
    setIsDeleteModalOpen(true);
    document.body.classList.add("deleteModal-open")
  }

  const closeModal = () => {
    setIsOpen(false);
    clearInputFields();
    setIsEditMode(false);
    document.body.classList.remove("modal-open");
  };

  const closeDeleteModal =()=>{
    setIsDeleteModalOpen(false);
    document.body.classList.remove("deleteModal-open")
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
      return
    }

    if(deleteModalRef.current && !deleteModalRef.current.contains(event.target)){
      closeDeleteModal();
      return
    }
  };


  const clearInputFields = () => {
    setAsset({
      name: "",
      description: "",
      motorID: "",
      manufacturer: "",
      modelNo: "",
      serialNo: "",
      installationDate: "",
      maintainenceDate: "",
      status: "Operational",
      location: "",
      power: "",
      voltage: "",
      current: "",
      speed: "",
    });
  };

  const handleAssetInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value });
  };

  const validateInputFields = (asset) => {
    for (const inputField in asset) {
      if (asset[inputField] === "") {
        toast.warning(`${inputField}  is required`, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }

      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (
        (inputField === "installationDate" ||
          inputField === "maintainenceDate") &&
        !datePattern.test(asset[inputField])
      ) {
        toast.warning(`${inputField} must be in the format dd/mm/yyyy`, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
    }

    return true;
  };

  const handleCreateNewAsset = async () => {
    const validated = validateInputFields(asset);
    if (validated) {
      try {
        const response = await axios.post(
          "https://motorvault.onrender.com/api/v1/new-asset",
          asset
        );
        if (response.status === 201) {
          toast.success(response.data.message, {
            autoClose: 1000,
            hideProgressBar: true,
          });
          fetchAssets();
          closeModal();
          clearInputFields();
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleEditChanges = async () => {
    const validated = validateInputFields(asset);

    const updatedFields = Object.entries(asset)
      .filter(([key, value]) => value !== originalAsset[key])
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});


    if (Object.keys(updatedFields).length === 0) {
      closeModal();
      toast.warning("No fields updated", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    if (validated) {
      try {
        const response = await axios.post(
          `https://motorvault.onrender.com/api/v1/edit-asset/${asset.motorID}`,
          updatedFields
        );
        if (response.status === 200) {
          toast.success(response.data.message, {
            autoClose: 1000,
            hideProgressBar: true,
          });
          closeModal();
          fetchAssets();
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    }
  };



  const handleDeleteAsset = async()=>{
    try {
      const response = await axios.post('https://motorvault.onrender.com/api/v1/delete-asset',{assetToDelete});
      if(response.status === 200){
        toast.success(response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        closeDeleteModal();
        fetchAssets();
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
        hideProgressBar: true,
      });
      closeDeleteModal();
    }
  }


  const openAssetInfo = (asset) => {
    const assetName = asset.name.replace(/\s/g, '-'); // Replace spaces with hyphens
    navigate(`/asset/${assetName}`,{state:{asset}});
  };

  return (
    <div className="c-layout">
      <div className="c-nav">
        <h3>ASSETS</h3>
      </div>
      <div className="c-content">
        <div className="add-asset-btn-layout">
          <button className="add-asset-btn" onClick={(e) => openModal(null, e)}>
            Add Asset
          </button>
        </div>

        <div className="assets-layout">
          <table>
            <thead>
              <tr>
                <th className="asset-id">Asset ID</th>
                <th className="asset-name">Name</th>
                <th className="asset-installation">Installation</th>
                <th className="asset-status">Status</th>
                <th className="actions"></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index} className="asset" onClick={()=>openAssetInfo(asset)}>
                  <td className="asset-id">{asset.motorID}</td>
                  <td className="asset-name">{asset.name} </td>
                  <td className="asset-installation">
                    {asset.installationDate}
                  </td>
                  <td className="asset-status">{asset.status}</td>
                  <td className="actions">
                    <div>
                      <img
                        src="/edit.svg"
                        alt="Edit"
                        className="options-svg"
                        onClick={(e) => openModal(asset, e)}
                      />
                      <img
                        src="/delete.svg"
                        alt="delete"
                        className="options-svg"
                        onClick={(e)=>openDeleteModal(asset.motorID,e)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  {isEditMode ? "Edit Asset" : "New Asset"}
                </h2>{" "}
                <button className="modal-close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <input
                    type="text"
                    className="asset-modal asset-modal-name"
                    placeholder="Asset Name"
                    name="name"
                    value={asset.name}
                    onChange={handleAssetInputChange}
                  />

                  <textarea
                    className="asset-modal asset-modal-description"
                    placeholder="Description"
                    name="description"
                    value={asset.description}
                    onChange={handleAssetInputChange}
                  ></textarea>

                  <div className="asset-modal-inline">
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder="Motor ID"
                      name="motorID"
                      value={asset.motorID}
                      readOnly={isEditMode}
                      onChange={handleAssetInputChange}
                    />
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder="Manufacturer"
                      name="manufacturer"
                      value={asset.manufacturer}
                      onChange={handleAssetInputChange}
                    />
                  </div>

                  <div className="asset-modal-inline">
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder="Model Number"
                      name="modelNo"
                      value={asset.modelNo}
                      onChange={handleAssetInputChange}
                    />
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder="Serial Number"
                      name="serialNo"
                      value={asset.serialNo}
                      onChange={handleAssetInputChange}
                    />
                  </div>

                  <div className="asset-modal-inline">
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder="Installation  (dd/mm/yyyy)"
                      name="installationDate"
                      value={asset.installationDate}
                      onChange={handleAssetInputChange}
                    />
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder=" Maintainence  (dd//mm//yyyy)"
                      name="maintainenceDate"
                      value={asset.maintainenceDate}
                      onChange={handleAssetInputChange}
                    />
                  </div>

                  <div className="asset-modal-inline">
                    <select
                      className="asset-modal asset-modal-inline-item asset-modal-status"
                      name="status"
                      value={asset.status}
                      onChange={handleAssetInputChange}
                    >
                      <option value="Operational">Operational</option>
                      <option value="Under Maintainence">
                        Under Maintainence
                      </option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <input
                      type="text"
                      className="asset-modal asset-modal-inline-item"
                      placeholder="Location"
                      name="location"
                      value={asset.location}
                      onChange={handleAssetInputChange}
                    />
                  </div>

                  <div>
                    <div className="asset-modal-specification">
                      {" "}
                      Specifications :
                    </div>
                    <div className="asset-modal-inline">
                      <input
                        type="number"
                        className="asset-modal asset-modal-inline-item"
                        placeholder="Power in kW"
                        name="power"
                        value={asset.power}
                        onChange={handleAssetInputChange}
                      />
                      <input
                        type="number"
                        className="asset-modal asset-modal-inline-item"
                        placeholder="Voltage in V"
                        name="voltage"
                        value={asset.voltage}
                        onChange={handleAssetInputChange}
                      />
                    </div>

                    <div className="asset-modal-inline">
                      <input
                        type="number"
                        className="asset-modal asset-modal-inline-item"
                        placeholder="Current in A"
                        name="current"
                        value={asset.current}
                        onChange={handleAssetInputChange}
                      />
                      <input
                        type="number"
                        className="asset-modal asset-modal-inline-item"
                        placeholder="Speed in RPM"
                        name="speed"
                        value={asset.speed}
                        onChange={handleAssetInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                {isEditMode ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditChanges}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreateNewAsset}
                  >
                    Add Asset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Asset Modal  */}

      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal" ref={deleteModalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                </h2>{" "}
                <button className="modal-close" onClick={closeDeleteModal}>
                  &times;
                </button>
              </div>
              <h2 className="modal-body" style={{textAlign:'center',fontWeight:'bold'}}>
                Are you sure ?
              </h2>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDeleteAsset}
                  >
                    Delete
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;
