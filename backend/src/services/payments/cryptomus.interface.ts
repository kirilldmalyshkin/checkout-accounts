// interface for working with payments
export interface ICryptomusService {
  createPayment(
    amount: number,
    orderId: string
  ): Promise<CreatePaymentResult | undefined>;
  checkPayment(uuid: string): Promise<CreatePaymentResult | undefined>;
  getHeader(payload: string): { sign: string; merchant: string };
}

export interface Currency {
  currency: string;
  network: string;
}

export interface Result {
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string;
  payer_amount: string;
  payer_currency: string;
  currency: string;
  network: string;
  payment_status: string;
  url: string;
  expired_at: number;
  status: string;
  is_final: boolean;
  currencies: Currency[];
}

export interface PaymentRequestBody {
  amount: string;
  orderId: string;
}

export interface CheckPaymentRequestBody {
  status: string;
  paymentId: string;
}

export interface CreatePaymentResult {
  state: number;
  result: Result;
}
