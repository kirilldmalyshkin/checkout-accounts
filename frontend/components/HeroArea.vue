<template>
  <section class="relative bg-[url('assets/IMG_3450_50_1.jpeg')] bg-cover bg-center bg-no-repeat h-screen">
    <div class="absolute inset-0 bg-black/20"></div>

    <div class="relative flex flex-col justify-center items-center h-full space-y-6">

      <div class="p-6 bg-black/50 rounded-lg">
        <h1 class="text-3xl font-extrabold sm:text-5xl text-white uppercase text-center">
          BUY REDDIT ACCOUNTS
          <strong class="block font-extrabold sm:text-5xl text-rose-700">REAL, AGED, HIGH-KARMA</strong>
        </h1>
      </div>

      <button @click="scrollToBuyNow" class="font-bold py-4 px-10 flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 rounded-lg text-lg shadow-sm">
        Buy Now
        <svg class="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </button>
<!--      <div class="bg-white rounded-lg  p-4 absolute bottom-[-30px] w-11/12 mx-auto md:w-2/3 flex justify-between md:space-x-4 text-gray-700">-->
      <div class="bg-white rounded-lg shadow-lg p-4 absolute bottom-[-30px] w-11/12 mx-auto md:w-2/3 flex justify-between md:space-x-4 text-gray-700">
        <div class="flex-1 flex items-center justify-center text-center">
          Real live accounts
        </div>
        <div class="flex-1 flex items-center justify-center text-center border-l border-r border-gray-300 px-4">
          High karma, good age
        </div>
        <div class="flex-1 flex items-center justify-center text-center">
          Manual farming
        </div>
      </div>
    </div>

  </section>
</template>
<script setup lang="ts">
const scrollToBuyNow = () => {
  const buyNowSection = document.getElementById('buyNowSection');
  if (buyNowSection) {
    buyNowSection.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
