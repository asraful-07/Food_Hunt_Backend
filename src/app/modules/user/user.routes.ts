import Router from "express";
import {
  CreateProviderProfileController,
  CreateRestaurantProfileController,
} from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const router = Router();

router.post("/provider-profile", CreateProviderProfileController);
router.post(
  "/create-provider-profile",
  checkAuth(Roles.PROVIDER),
  CreateRestaurantProfileController,
);

export const userRoutes = router;
