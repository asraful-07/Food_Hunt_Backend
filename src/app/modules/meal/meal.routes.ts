import { Router } from "express";
import { mealController } from "./meal.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Roles } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", checkAuth(Roles.PROVIDER), mealController.createMeal);
router.get("/", mealController.getAllMeal);

export const mealRoutes = router;
