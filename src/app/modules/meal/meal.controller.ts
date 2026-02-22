import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { mealService } from "./meal.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createMeal = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;

  const meal = await mealService.createMeal(user, payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Create meal successfully",
    data: meal,
  });
});

const getAllMeal = catchAsync(async (req: Request, res: Response) => {
  const meal = await mealService.getAllMeal();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Create meal successfully",
    data: meal,
  });
});

export const mealController = {
  createMeal,
  getAllMeal,
};
