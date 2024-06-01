import { Asset } from "../model/asset.model.js";

const GetAssets = async (req, res) => {
  try {
    const assets = await Asset.find().select("-_id -createdAt -updatedAt -__v");
    return res.status(200).json({
      assets,
    });
  } catch (error) {
    console.error("ERROR FETCHING ASSETS: ", error);
    return res.status(500).json({
      message: "Error fetching data",
    });
  }
};

const CreateNewAsset = async (req, res) => {
  try {
    const asset = req.body;

    for (const field in asset) {
      if (asset[field] === "") {
        return res.status(400).json({
          message: `${field} is required`,
        });
      }
    }
    const { motorID } = asset;

    const existingMotorID = await Asset.findOne({ motorID });
    if (existingMotorID) {
      return res.status(400).json({
        message: "MotorID already exists",
      });
    }

    await Asset.create(asset);
    return res.status(201).json({
      message: "Asset added successfully",
    });
  } catch (error) {
    console.log("ERROR ADDING ASSET: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const EditAsset = async (req, res) => {
  try {
    const motorID = req.params.motorID;
    const editFields = req.body;

    await Asset.findOneAndUpdate({ motorID: motorID }, editFields, {
      new: true,
    });

    return res.status(200).json({
      message: "Save changes successfull",
    });
  } catch (error) {
    console.log("ERROR  UPDATING ASSSET", error);
    return res.status(500).json({
      message: "Try again later",
    });
  }
};

const DeleteAsset = async (req, res) => {
  try {
    const motorID = req.body.assetToDelete;

    const deletedAsset = await Asset.findOneAndDelete({ motorID });
    if (deletedAsset) {
      return res.status(200).json({
        message: "Asset deleted successfully",
      });
    }
  } catch (error) {
    console.log("ERROR DELETING ASSET:", error);
    return res.status(500).json({
      message: "Try again later",
    });
  }
};

export { GetAssets, CreateNewAsset, EditAsset, DeleteAsset };
