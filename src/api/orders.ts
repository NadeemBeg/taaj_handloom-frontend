import { apiClient } from '../lib/apiClient';

interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OrderItemInput {
  product: string;
  variant?: string;
  quantity: number;
}

export interface CreateOrderPayload {
  contact: { name: string; phone: string; whatsapp?: string; email?: string };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItemInput[];
  customerType?: 'individual' | 'wholesale';
  couponCode?: string;
  notes?: string;
}

export interface CreatedOrder {
  orderNumber: string;
  amounts: { subtotal: number; discount: number; total: number };
  items: Array<{
    snapshot: { name: string; sku: string; color?: string; image?: string };
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
  status: string;
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<{ order: CreatedOrder; whatsappUrl: string }> {
  const res = await apiClient.post<Envelope<{ order: CreatedOrder; whatsappUrl: string }>>(
    '/orders',
    payload,
  );
  return res.data.data;
}

export async function fetchOrderSummary(orderNumber: string): Promise<CreatedOrder> {
  const res = await apiClient.get<Envelope<{ order: CreatedOrder }>>(`/orders/${orderNumber}`);
  return res.data.data.order;
}
