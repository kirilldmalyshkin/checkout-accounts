// stores/useOrderStore.ts
import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useOrderStore = defineStore('order', () => {
    const orderId = ref(null);

    const initOrder = () => {
        const storedOrder = localStorage.getItem('order');
        orderId.value = storedOrder || null;
    }

    const setOrderId = (id) => {
        orderId.value = id;
        localStorage.setItem('order', id);
    }

    return { orderId, setOrderId, initOrder }
});

