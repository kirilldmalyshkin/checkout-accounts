import { CreatePaymentResult, ICryptomusService } from './cryptomus.interface';
import crypto from 'node:crypto';
import axios from 'axios';

class CryptomusService implements ICryptomusService {
  private readonly apiUrl: string;
  private readonly merchantId: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.CRYPTOMUS_API_URL || 'https://api.cryptomus.com';
    this.merchantId = process.env.CRYPTOMUS_MERCHANT_ID || '';
    this.apiKey = process.env.CRYPTOMUS_API_KEY || '';
  }

  // signature encryption
  getHeader(payload: string) {
    const sign = crypto
      .createHash('md5')
      .update(Buffer.from(payload).toString('base64') + this.apiKey)
      .digest('hex');
    return {
      merchant: this.merchantId,
      sign,
    };
  }

  async createPayment(amount: number, orderId: string) {
    const payload = {
      amount: amount.toString(),
      currency: 'USD',
      order_id: orderId,
    };
    const headers = this.getHeader(JSON.stringify(payload));

    try {
      const { data } = await axios.post<CreatePaymentResult>(
        `${this.apiUrl}/v1/payments`, payload, { headers }
      );
      return data;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  }

  async checkPayment(uuid: string): Promise<CreatePaymentResult | undefined> {
    const payload = { uuid };
    const headers = this.getHeader(JSON.stringify(payload));
    try {
      const { data } = await axios.post<CreatePaymentResult>(
        `${this.apiUrl}/v1/payment/info`, payload, { headers }
      );
      return data;
    } catch (error) {
      console.error('Error checking payment:', error);
    }
  }

  public async checkPaymentGet(uuid: string): Promise<CreatePaymentResult | undefined> {
    try {
      const headers = this.getHeader(uuid);
      const response = await axios.get(`${this.apiUrl}/payments/${uuid}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error checking payment get:', error);
      return undefined;
    }
  }
}

export const cryptomusService = new CryptomusService();
