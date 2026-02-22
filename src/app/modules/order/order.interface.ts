import { OrderStatus } from "../../../generated/prisma/enums";

export interface ICreateOrderPayload {
  deliveryAddress: string;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  mealId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  customerId: string;
  providerId: string;
  totalPrice: number;
  deliveryAddress: string;
  status: OrderStatus;
  items: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}
