import { OrderStatus } from "../../../generated/prisma/enums";

export interface ICreateOrderPayload {
  deliveryAddress: string;
}

export interface IOrderStatusUpdatePayload {
  status: OrderStatus;
}
