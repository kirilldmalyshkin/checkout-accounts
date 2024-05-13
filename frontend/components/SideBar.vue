<template>
<!--  min-h-screen-->
  <div class="flex justify-center items-center ">
    <div v-if="open">
      <!-- Sidebar Overlay -->
      <div v-if="open" class="fixed inset-0 z-50 overflow-hidden">
        <div v-if="open" @click="open = false" class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <!-- Sidebar Content -->
        <section class="absolute bg-gray-100 inset-y-0 right-0 max-w-full flex">
          <div v-if="open" class="w-screen max-w-md" :class="{ 'transform translate-x-full': !open }">
            <div class="h-full flex flex-col bg-gray-100 overflow-auto">
              <div class="p-8 bg-gray-100 flex flex-col lg:w-full h-full">
                <div class="relative">
                  <h2 class="text-xl font-semibold text-black">My Cart</h2>
                  <button @click="open = false" class="text-black hover:text-gray-700 absolute right-0 top-0.5">
                    <span class="sr-only">Close</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  <p class="text-gray-500 leading-relaxed font-light pt-4">* You cart must not contain more than 1 items to place on order</p>
                </div>

                <div class="flex flex-row justify-center items-center mt-6">
                  <hr class="border w-full" />
                  <p class="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600 mb-4">Pay with
                    Cryptocurrency</p>
                  <hr class="border w-full" />
                </div>
                <div>
                  <div v-if="cart.addToCart.length > 0" class="flex items-center justify-between mb-4" v-for="(cart,idx) in cart.addToCart" :key="idx">
                    <div class="ml-6">
                      <h6 class="font-medium text-gray-900">{{ cart.attributes.name }}</h6>
                      <p class="text-gray-600">{{ cart.attributes.price }}</p>
                    </div>
                    <div class="ml-6">
                      <button @click="remove(cart.id)" class="text-gray-500 hover:text-gray-700">
                        <span class="sr-only">Remove</span>
                        <svg class="h-6 w-6" x-description="Heroicon name: x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                      <!--                          <button class="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600" @click="removeCart(cart.idx)>Remove</button>-->
                    </div>
                  </div>
                  <div v-else>
                    <p>No accounts in your cart</p>
                  </div>
                </div>

                <div class="mt-auto">
                  <input
                      class="border bg-white border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email" name="" id="" placeholder="Email" />
                </div>

                <button
                    class="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                  <div>
                    <p class="text-base leading-4">Checkout $ {{ calculatePrice().toFixed(2) }}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- Your main content goes here -->
    <!-- Open sidebar button -->

    <button @click="open = true" class="flex items-center">
      <svg class="h-6 w-6 flex-shrink-0 text-orange-400 group-hover:text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
      <span v-if="cart.addToCart.length > 0" class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ cart.addToCart.length }}</span>
      <span v-else-if="cart.addToCart.length === 0" class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
      <div v-else role="status">
        <svg aria-hidden="true" class="w-4 h-4 ml-1 text-gray-200 animate-spin fill-orange-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>


    </button>
  </div>
</template>

<script setup>

const open = ref(false);

import { useCartStore } from '~~/stores/cart'
const cart = useCartStore()

onMounted(() => {
  cart.initCart();
})


const remove = cart.removeCartFn;
const calculatePrice = cart.calculatePrice;
</script>