import crypto from "node:crypto";
import axios from "axios";


type Product = {
    id: number;
    attributes: {
        name: string;
        price: string;
        post_karma: number;
        comment_karma: number;
        total_karma: number;
        age: string;
        description: string | null;
        slug: string;
        login: string;
        pass: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

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

export interface CreatePaymentResult {
    state: number;
    result: Result;
}

export default defineEventHandler(async (event) => {
    // const orderStore = useOrderStore();

    console.log('Handling request to /api/orders')
    const body = await readBody(event)
    const items = body.items
    const email = body.email || 'no email'
    console.log('sumPrices(items)::', sumPrices(items));
    // const itemIds = Object.keys(items).map(key => items[key].id)

    try {
        /*const allOrders = await fetch(`${process.env.API_URL}/orders`, {
            method: 'GET'
        })
        if (!allOrders.ok) {
            throw new Error('Failed to fetch all orders');
        }
        const allOrdersData = await allOrders.json()

        if (allOrdersData && allOrdersData.data) {
            const orderExists = itemIds.some(id => {
                return allOrdersData.data.some((order: any) => {
                    const orderItems = order.attributes.item;
                    return Object.values(orderItems).some((orderItem: any) => {
                        return orderItem.id === id
                    });
                });
            });

            if (orderExists) {
                console.log('orderExists')
                throw createError({
                    statusCode: 400,
                    message: `One or more items already exist in orders.`
                })
            }
        }*/

        const orderResponse = await fetch(`${process.env.API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    item: { ...items },
                    payment_status: 'created'
                }
            })
        })

        if (!orderResponse.ok) {
            throw new Error('Failed to fetch accounts')
        }
        const orderData = await orderResponse.json()

        if (orderData && orderData.data) {
            const payload = {
                amount: String(sumPrices(items)),
                currency: 'USD',
                order_id: String(orderData.data.id),
                url_callback: `${process.env.FRONT_URL}/payment-status`,
                url_success: `${process.env.FRONT_URL}/order?$id=${orderData.data.id}`,
                lifetime: process.env.PAYMENT_LIFETIME || 3600,
                additional_data: `email: ${email}`
            };

            console.log('payload::', payload)

            try {
                const { data } = await axios.post<CreatePaymentResult>(
                    "https://api.cryptomus.com/v1/payment",
                    payload,
                    {
                        headers: getHeader(JSON.stringify(payload)),
                    }
                );

                console.log('Payment created:', data.result);

                return { url: data.result.url, orderId: data.result.order_id };
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error response:', error.response?.data);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        }

    } catch (error) {
        console.error(error)
    }
});

const sumPrices = (products: Product[]): number => {
    return products.reduce((sum, product) => {
        const priceStr = product.attributes.price;
        const price = parseFloat(priceStr.replace(/[^\d.-]/g, ''));
        return sum + (isNaN(price) ? 0 : price);
    }, 0);
};

const getHeader = (payload: string) => {
    const sign = crypto
        .createHash("md5")
        .update(Buffer.from(payload).toString("base64") + process.env.PAYMENT_API_KEY)
        .digest("hex");
    return {
        merchant: process.env.MERCHANT_ID as string,
        sign,
    };
}