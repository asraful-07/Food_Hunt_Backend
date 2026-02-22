import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  CreateProviderProfileService,
  CreateRestaurantProfileService,
} from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

export const CreateProviderProfileController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await CreateProviderProfileService(payload);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Created providerProfile successfully",
      data: result,
    });
  },
);

export const CreateRestaurantProfileController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const profile = await CreateRestaurantProfileService(user, payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Create restaurant profile successfully",
      data: profile,
    });
  },
);
