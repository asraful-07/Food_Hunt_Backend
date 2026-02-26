import { Router } from "express";
import {
  ChangeActivateController,
  CreateCustomerController,
  GetAllUsersController,
  GetMeController,
  LoginCustomerController,
  UpdateProfileController,
} from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", CreateCustomerController);
router.post("/login", LoginCustomerController);
router.get("/all-user", checkAuth(Roles.ADMIN), GetAllUsersController);
router.get(
  "/me",
  checkAuth(Roles.ADMIN, Roles.PROVIDER, Roles.CUSTOMER),
  GetMeController,
);
router.patch("/status/:id", checkAuth(Roles.ADMIN), ChangeActivateController);
router.put(
  "/profile/:id",
  checkAuth(Roles.ADMIN, Roles.PROVIDER, Roles.CUSTOMER),
  UpdateProfileController,
);

export const authRoutes = router;
