interface OrderItem {
    id: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log('Products api::::');
    console.dir(body, { depth: null });
    const { orderId } = body;
    const accounts: any[] = [];
    console.log(`${process.env.API_URL}/orders/${orderId}`)
    try {
        const getOrderResponse = await fetch(`${process.env.API_URL}/orders/${orderId}`, {
            method: 'GET',
        })

        if (!getOrderResponse.ok) {
            throw new Error('Failed to get order')
        }

        const { data } = await getOrderResponse.json()
        const orderItems = data?.attributes?.item;
        const paymentStatus = data?.attributes?.payment_status;

        if (!paymentStatus || paymentStatus !== 'payed') {
            console.log('Order status is not equal');
            throw new Error(`Order status is not equal`)
        }

        for (const item of Object.values(orderItems)) {
            const orderItem = item as OrderItem;
            console.log(orderItem.id)
            const accountId = orderItem.id;

            if (accountId) {
                const getAccResponse = await fetch(`${process.env.API_URL}/products/${accountId}`, {
                    method: 'GET'
                });

                if (!getAccResponse.ok) {
                    throw new Error(`Failed to get account /w id:${accountId}`)
                }

                const { data } = await getAccResponse.json();
                const accountPayed = data.attributes.payed;

                if (!accountPayed) {
                    console.log('Account payment status is not equal');
                }

                accounts.push(data);
            }
        }

        return {
            items: accounts
        };
    } catch (error) {
        console.log('error payment status', error)
        return {
            status: 'Error',
        };
    }
});
