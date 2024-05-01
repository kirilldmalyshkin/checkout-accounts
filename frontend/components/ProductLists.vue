<template>
  <div id="buyNowSection" class="min-h-screen h-full bg-white flex items-center justify-center py-10">
    <div class="lg:min-w-[1022px] xl:min-w-[1230px] 2xl:min-w-[1530px]">
      <div class="w-full  px-2 max-w-[453px] mx-auto relative">
        <h2  class="text-xl sm:text-2xl font-medium mb-10">
          AVAILABLE REDDIT ACCOUNTS
        </h2>
        <button @click="reset()" class="text-gray-500 mb-10 absolute top-1 right-0">
          Reset
        </button>
      </div>
      <div class="flex items-center justify-center">
        <div>
        <!-- ГОВНОКОД ON -->
          <table class="sm:inline-table w-full flex flex-row sm:bg-white overflow-hidden ">
            <thead
                class="text-black"
            >
            <tr
                v-if="accounts" v-for="(product, index) in accounts"
                class="bg-[#222E3A]/[6%] flex flex-col sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                :class="{'sm:flex' : index === 0 , 'sm:hidden' : index !== 0 }"
                :key="product.id">
              <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Name</th>
              <th class="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">Price</th>
              <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Age</th>
              <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Post Karma</th>
              <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Comment Karma</th>
              <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Total Karma</th>
              <th
                  class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none" style="height: 70px; line-height: 40px">
                Add to cart
              </th>
            </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
            <tr
                v-if="accounts" v-for="product in accounts" :key="product.id"
                class="flex flex-col sm:table-row mb-2 sm:mb-0"
            >
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                {{ product.attributes.name }}
              </td>
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                {{ parseFloat(product.attributes.price) }} $
              </td>
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                {{ product.attributes.age }}
              </td>
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                {{ product.attributes.post_karma }}
              </td>
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                {{ product.attributes.comment_karma }}
              </td>
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                {{ product.attributes.total_karma }}
              </td>
              <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                <button @click="addCart(product)"
                        :class="{'bg-gray-300 cursor-not-allowed opacity-50' : cart.isProductInCart(product.id) }"
                        class="inline-block py-3 px-7 w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm text-center">
                  Add
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <!-- ГОВНОКОД OFF-->
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import productsQuery from '@/apollo/queries/products.gql'

const cart = useCartStore()

const accounts = ref([])

const fetchAccounts = async () => {
  try {
    const { data } = await useAsyncQuery(productsQuery)
    return data.value?.products?.data ?? []
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return []
  }
}

const refetchAccounts = async () => {
  try {
    const { refetch } = useQuery(productsQuery)
    const res = await refetch()
    return res?.data?.products?.data ?? []
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return []
  }
}

const loadAccounts = async () => {
  accounts.value = await fetchAccounts()
}

const loadRefetchAccounts = async () => {
  accounts.value = await refetchAccounts()
}

const addCart = (product) => {
  if (!cart.isProductInCart(product.id)) {
    cart.addToCartFn(product);
  }
}

const reset = async () => {
  await loadRefetchAccounts()
}

loadAccounts()
</script>

