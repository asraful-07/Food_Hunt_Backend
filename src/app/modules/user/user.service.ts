import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import {
  ICreateProviderProfilePayload,
  ICreateRestaurantProfilePayload,
} from "./user.interface";
import { auth } from "../../lib/auth";
import { Roles } from "../../../generated/prisma/enums";
import { IRequestUser } from "../../interface/requestUser.interface";

export const CreateProviderProfileService = async (
  payload: ICreateProviderProfilePayload,
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.provider.email,
    },
  });

  if (userExists) {
    throw new AppError(status.BAD_REQUEST, "User already exist");
  }

  const userData = await auth.api.signUpEmail({
    body: {
      name: payload.provider.name,
      email: payload.provider.email,
      password: payload.password,
      role: Roles.PROVIDER,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const providerData = await tx.provider.create({
        data: {
          userId: userData.user.id,
          ...payload.provider,
        },
      });
      return providerData;
    });

    return result;
  } catch (err) {
    console.log(err);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw err;
  }
};

export const CreateRestaurantProfileService = async (
  user: IRequestUser,
  payload: ICreateRestaurantProfilePayload,
) => {
  const providerExist = await prisma.provider.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const providerProfileExist = await prisma.providerProfile.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (providerProfileExist) {
    throw new AppError(status.BAD_REQUEST, "Restaurant profile already exists");
  }

  const result = await prisma.providerProfile.create({
    data: {
      providerId: providerExist.id,
      ...payload,
    },
  });

  return result;
};
