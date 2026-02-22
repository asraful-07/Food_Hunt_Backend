import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../../interface/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { ICreateOrderPayload } from "./order.interface";
import status from "http-status";

const createOrder = async (
  user: IRequestUser,
  payload: ICreateOrderPayload,
) => {
  const { deliveryAddress } = payload;

  return await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.findFirstOrThrow({
      where: {
        email: user.email,
      },
    });

    const cart = await tx.cart.findUnique({
      where: {
        customerId: customer.id,
      },
      include: {
        items: {
          include: {
            meal: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError(status.NOT_FOUND, "Cart is empty");
    }

    const providerId = cart.items[0].meal.providerId;
    return providerId;
  });
};
