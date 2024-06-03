interface PaymentWebhook {
    type?: string;
    uuid: string;
    order_id: string;
    amount: string;
    payment_amount: string;
    payment_amount_usd: string;
    merchant_amount: string;
    commission: string;
    is_final: boolean;
    status: string;
    from: string;
    wallet_address_uuid: string | null;
    network: string;
    currency: string;
    payer_currency: string;
    additional_data: any | null;
    convert: {
        to_currency: string;
        commission: string | null;
        rate: string;
        amount: string;
    };
    txid: string;
    sign: string;
}

export default defineEventHandler(async (event) => {
    const body: PaymentWebhook = await readBody(event);
    console.log('PaymentWebhook::::');
    console.dir(body, { depth: null });
    const { order_id, is_final, status } = body;

    if (is_final && status === 'paid') {
        try {
            const putOrderResponse = await fetch(`${process.env.API_URL}/orders/${order_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        payment_status: status
                    }
                })
            })

            if (!putOrderResponse.ok) {
                throw new Error('Failed to put order')
            }

            const { data } = await putOrderResponse.json();
            const orderItems = data.attributes.item;
            Object.values(orderItems).map(async (orderItem: any) => {
                console.log(orderItem.id)
                const accountId = orderItem.id;

                if (accountId) {
                    const putAccResponse = await fetch(`${process.env.API_URL}/products/${accountId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: {
                                payed: true
                            }
                        })
                    });

                    if (!putAccResponse.ok) {
                        throw new Error(`Failed to put account /w id:${accountId}`)
                    }
                }
            })

        } catch (error) {
            console.log('error payment status', error)
        }
    }

    return {
        status: 'Success',
        message: 'Payment status received successfully'
    };
});
