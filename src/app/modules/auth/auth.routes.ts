import { Router } from "express";
import {
  ChangeActivateController,
  CreateCustomerController,
  GetAllUsersController,
  GetMeController,
  GetNewTokenController,
  LoginCustomerController,
  logoutUserController,
  UpdateProfileController,
} from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", CreateCustomerController);
router.post("/login", LoginCustomerController);
router.post("/refresh-token", GetNewTokenController);
router.get("/all-user", checkAuth(Roles.ADMIN), GetAllUsersController);
router.get(
  "/me",
  checkAuth(Roles.ADMIN, Roles.PROVIDER, Roles.CUSTOMER),
  GetMeController,
);
router.post(
  "/logout",
  checkAuth(Roles.ADMIN, Roles.PROVIDER, Roles.CUSTOMER),
  logoutUserController,
);
router.patch("/status/:id", checkAuth(Roles.ADMIN), ChangeActivateController);
router.put(
  "/profile/:id",
  checkAuth(Roles.ADMIN, Roles.PROVIDER, Roles.CUSTOMER),
  UpdateProfileController,
);

export const authRoutes = router;
