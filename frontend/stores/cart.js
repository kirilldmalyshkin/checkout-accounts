// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    const addToCart = ref([]);

    const initCart = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        addToCart.value = storedProducts.map(product => {
            return { ...product, id: product.id };
        });
    }

    const isProductInCart = (id) => {
        return addToCart.value.some(product => product.id === id);
    }

    const addToCartFn = (product) => {
        const existingProductIndex = addToCart.value.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            return;
        }

        addToCart.value.push(product);
        localStorage.setItem('products', JSON.stringify(addToCart.value));
    }

    const removeCartFn = (id) => {
        addToCart.value = addToCart.value.filter(product => {
            return product.id !== id;
        });

        localStorage.setItem('products', JSON.stringify(addToCart.value));
    }

    const removeFullCartFn = () => {
        addToCart.value = []
        localStorage.setItem('products', JSON.stringify([]));
    }

    const calculatePrice = function(){
        let price = 0;
        addToCart.value.forEach(product => {
            price += parseFloat(product?.attributes?.price);
        })
        return price;
    }

    return { addToCart, addToCartFn, removeCartFn, removeFullCartFn, calculatePrice, initCart, isProductInCart }
});
