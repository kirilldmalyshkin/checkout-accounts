export default defineEventHandler(async (event) => {
    const API_URL = process.env.API_URL;
    const endpoint = '/products';
    const filters = 'filters[payed][$ne]=true';
    const fields = [
        'name',
        'price',
        'age',
        'post_karma',
        'comment_karma',
        'total_karma'
    ].map((field, index) => `fields[${index}]=${field}`).join('&');

    const url = `${API_URL}${endpoint}?${filters}&${fields}`;

    try {
        const getAccResponse = await fetch(url, {
            method: 'GET',
        });

        if (!getAccResponse.ok) {
            throw new Error('Failed to get order');
        }

        const { data } = await getAccResponse.json();

        return data;
    } catch (error) {
        console.log('error get accounts ', error)
        return {
            status: 'Error',
        };
    }
});
