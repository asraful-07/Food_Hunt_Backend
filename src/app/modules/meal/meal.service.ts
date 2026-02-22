import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateMealPayload } from "./meal.interface";
import { IRequestUser } from "../../interface/requestUser.interface";

const createMeal = async (user: IRequestUser, payload: ICreateMealPayload) => {
  const provider = await prisma.provider.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const providerProfile = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      providerId: provider.id,
    },
  });

  const categoryExist = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!categoryExist) {
    throw new AppError(status.BAD_REQUEST, "Category is missing");
  }

  if (payload.price <= 0) {
    throw new AppError(status.BAD_REQUEST, "Price must be greater than 0");
  }

  const result = await prisma.meal.create({
    data: {
      providerId: providerProfile.id,
      ...payload,
    },
  });

  return result;
};

const getAllMeal = async () => {
  const result = await prisma.meal.findMany();
  return result;
};

export const mealService = {
  createMeal,
  getAllMeal,
};
