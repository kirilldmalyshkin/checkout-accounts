// path: ./src/api/payment/controllers/payment.ts
import { factories } from '@strapi/strapi';
import { Context } from 'koa';
import { cryptomusService, PaymentRequestBody, CheckPaymentRequestBody } from '../../../services';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  async create(ctx: Context) {
    const { amount, orderId } = ctx.request.body as PaymentRequestBody;

    try {
      const payment = await cryptomusService.createPayment(parseFloat(amount), orderId);
      if (!payment || !payment.result) {
        ctx.throw(400, 'Payment creation failed');
        return;
      }

      console.log('HELLO!!!!!!!!!!!!!!!!')
      console.log(payment);

      // Assuming 'payment.result' contains the necessary fields
      const { uuid, status, is_final, url } = payment.result;

      const newPayment = await strapi.entityService.create('api::payment.payment', {
        data: {
          orderId,
          amount,
          uuid,
          status,
          isFinal: is_final,
          url,
        },
      });

      ctx.send(newPayment);
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  async handleCallback(ctx: Context) {
    const { paymentId, status } = ctx.request.body as CheckPaymentRequestBody;

    // Update payment status in your system
    await strapi.services.payment.update({ id: paymentId }, { status });

    ctx.send({ received: true });
  },
}));
