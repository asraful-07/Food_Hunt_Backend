import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { mealRoutes } from "../modules/meal/meal.routes";
import { cartRoutes } from "../modules/cart/cart.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/provider", userRoutes);
router.use("/category", categoryRoutes);
router.use("/meal", mealRoutes);
router.use("/cart", cartRoutes);

export const IndexRoutes = router;
