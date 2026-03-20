import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import {
  ChangeActivateService,
  CreateCustomerService,
  GetAllUsersService,
  GetMeService,
  GetNewTokenService,
  LoginCustomerService,
  logoutUserService,
  UpdateProfileService,
} from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import {
  setAccessTokenCookie,
  setBetterAuthSessionCookie,
  setRefreshTokenCookie,
} from "../../utils/token";
import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { clearCookie } from "../../utils/cookie";

export const CreateCustomerController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CreateCustomerService(req.body);
    const { accessToken, refreshToken, token, ...rest } = result;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token as string);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Create user Successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest,
      },
    });
  },
);

export const LoginCustomerController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LoginCustomerService(req.body);

    const { accessToken, refreshToken, token, ...rest } = result;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    setBetterAuthSessionCookie(res, token as string);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Create user Successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest,
      },
    });
  },
);

export const GetNewTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];

    if (!refreshToken) {
      throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
    }

    const result = await GetNewTokenService(
      refreshToken,
      betterAuthSessionToken,
    );

    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

    setAccessTokenCookie(res, accessToken);
    setAccessTokenCookie(res, newRefreshToken);
    setBetterAuthSessionCookie(res, sessionToken);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        sessionToken,
      },
    });
  },
);

export const logoutUserController = catchAsync(
  async (req: Request, res: Response) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await logoutUserService(betterAuthSessionToken);
    clearCookie(res, "accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    clearCookie(res, "refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    clearCookie(res, "better-auth.session_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "User logged out successfully",
      data: result,
    });
  },
);

export const GetAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await GetAllUsersService();

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Fetch all user successfully",
      data: result,
    });
  },
);

export const GetMeController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await GetMeService(user);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Fetch all user successfully",
      data: result,
    });
  },
);

export const ChangeActivateController = catchAsync(
  async (req: Request, res: Response) => {
    const admin = req.user;
    const userId = req.params.id;
    const payload = req.body;

    const result = await ChangeActivateService(
      admin,
      userId as string,
      payload,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  },
);

export const UpdateProfileController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const { id } = req.params;

    const result = await UpdateProfileService(id as string, user, payload);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Fetch all user successfully",
      data: result,
    });
  },
);
