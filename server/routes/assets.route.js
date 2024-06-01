import { Router } from "express";
import {
  GetAssets,
  CreateNewAsset,
  DeleteAsset,
  EditAsset,
} from "../controllers/assets.controller.js";

const assetRouter = Router();

assetRouter.get("/assets", GetAssets);

assetRouter.post("/new-asset", CreateNewAsset);

assetRouter.post("/edit-asset/:motorID", EditAsset);

assetRouter.post("/delete-asset", DeleteAsset);

export default assetRouter;
