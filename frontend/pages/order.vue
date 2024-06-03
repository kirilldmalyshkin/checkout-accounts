<template>
  <div class="container px-6 py-10 mx-auto text-gray-700 bg-white h-svh">
    <h1 class="text-xl font-extrabold sm:text-3xl uppercase text-center pb-8">{{ h1 }}</h1>
    <div v-if="accounts && accounts.length > 0" >
      <!-- ГОВНОКОД ON -->
      <div class="mr-auto pt-6 pl-6 mb-12">
        <h2 class="text-lg leading-normal font-bold mb-1 text-gray-700">I wish you a successful work!</h2>
        <p class="text-gray-500 leading-relaxed font-light">1. use a proxy server in the USA</p>
        <p class="text-gray-500 leading-relaxed font-light">2. After you have logged into your account, start working only after 3-4 hours</p>
      </div>
      <table class="sm:inline-table w-full flex flex-row sm:bg-white overflow-hidden text-gray-700 md:shadow-lg md:shadow-amber-400/50">
        <thead
            class="text-black"
        >
        <tr
            v-for="(account, index) in accounts"
            class="bg-[#222E3A]/[6%] flex flex-col sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            :class="{'sm:flex' : index === 0 , 'sm:hidden' : index !== 0 }"
            :key="account.id">
          <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Name</th>
          <th class="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">Login</th>
          <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">Password</th>
        </tr>
        </thead>
        <tbody class="flex-1 sm:flex-none">
        <tr
            v-for="account in accounts" :key="account.id"
            class="flex flex-col sm:table-row mb-2 sm:mb-0"
        >
          <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
            {{ account.attributes.name }}
          </td>
          <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
            {{ account.attributes.login }}
          </td>
          <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
            {{ account.attributes.pass }}
          </td>
        </tr>
        </tbody>
      </table>

      <button @click="generateTextFile" class="mb-4 mt-4  inline-block py-3 px-7 w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-sm text-sm text-center">Download Text File</button>
      <!-- ГОВНОКОД OFF-->
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '~~/stores/order.js'
import { ref } from 'vue'

const order = useOrderStore()

onMounted(() => {
  order.initOrder();
})

const accounts = ref([])
const h1 = ref('')
const fetchAccounts = async () => {
  if (!order.orderId) {
    h1.value = `Order not found, please contact support`;
    return;
  }

  try {
    const { data } = await useFetch('/api/accounts-order', {
      method: 'POST',
      body: { orderId: order.orderId }
    });

    if (data && data?.value?.items) {
      h1.value = 'Success payment!'
      return data.value.items;
    } else {
      console.error('No items in response data');
      h1.value = `Error processing order №${order.orderId}, please contact support or wait 1-2 minutes until the order is processed`;
      return [];
    }
  } catch (error) {
    console.error('Error fetching payed accounts:', error);
    return [];
  }
};

const loadAccounts = async () => {
  accounts.value = await fetchAccounts()
}

watch(() => order.orderId, async (newOrderId) => {
  if (newOrderId !== null) {
    await loadAccounts();
  } else {
    h1.value = `Order not found, please contact support`;
  }
}, { immediate: true });

const generateTextFile = () => {
  let textContent = "I wish you a successful work!\n";
  textContent += "1. use a proxy server in the USA\n";
  textContent += "2. After you have logged into your account, start working only after 3-4 hours\n\n\n";
  textContent += "Accounts Information:\n\n";

  accounts.value.forEach(account => {
    textContent += `Name: ${account.attributes.name}\n`;
    textContent += `Login: ${account.attributes.login}\n`;
    textContent += `Password: ${account.attributes.pass}\n\n`;
  });

  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'accounts.txt';
  a.click();

  URL.revokeObjectURL(url);
}

</script>