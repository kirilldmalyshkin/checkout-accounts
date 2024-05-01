<template>

    <div class="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div class="flex flex-col justify-start items-start w-full space-y-9">
            <div class="flex justify-start flex-col items-start space-y-2">

                <p class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-black">Checkout</p>

            </div>

            <div
                class="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                <div
                    class="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center py-7 sm:py-0 xl:py-10 px-10 xl:w-full">


                <div class="mx-auto w-96 right-0 top-10 flex flex-col gap-2 border bg-white p-4">
                  <div v-if="cartData.length > 0" class="flex items-center justify-between" v-for="(cart,idx) in cartData" :key="idx">
                    <div class="ml-6 flex">
                      <h6 class="font-medium text-gray-900 inline mr-8">{{ cart?.attributes?.name }} {{cart.id}}</h6>
                      <p class="text-gray-600">${{ cart?.attributes?.price }}</p>
                    </div>
                    <div class="ml-6">
                      <button class="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600" @click="removeCart(cart.id)">Remove</button>
                    </div>
                  </div>
                  <div v-else>
                    <p>No product in your cart</p>
                  </div>
                 
                </div>
              
                   
                </div>

                <div class="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                  <div>
                    <h2 class="text-xl font-semibold text-black">My Cart</h2>
                    <p class="text-gray-500 leading-relaxed font-light pt-4">* You cart must not contain more than 1 items to place on order</p>
                  </div>

                    <div class="flex flex-row justify-center items-center mt-6">
                        <hr class="border w-full" />
                        <p class="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">Pay with
                          Cryptocurrency</p>
                        <hr class="border w-full" />
                    </div>
                    <div>
                      <div v-if="cartData.length > 0" class="flex items-center justify-between" v-for="(cart,idx) in cartData" :key="idx">
                        <div class="ml-6">
                          <h6 class="font-medium text-gray-900">{{ cart.name }}</h6>
                          <p class="text-gray-600">${{ cart.price }}</p>
                        </div>
                        <div class="ml-6">
                          <button @click="removeCart(cart.idx)" class="text-gray-500 hover:text-gray-700">
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

                    <div class="mt-8">
                        <input
                            class="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                            type="email" name="" id="" placeholder="Email" />
                    </div>

                    <button
                        class="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                        <div>
                            <p class="text-base leading-4">Checkout $ {{ totalPrice().toFixed(2) }}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    


</template>


<script setup>
import { useCartStore } from '~~/stores/cart'
const cart = useCartStore()

const cartData = cart.addToCart
const removeCart = cart.removeCartFn
const totalPrice = cart.calculatePrice

</script> 