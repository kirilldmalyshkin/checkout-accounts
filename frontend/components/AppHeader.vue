<template>
  <div class="bg-white sticky top-0 z-50 px-3">
    <header class="relative bg-white">
      <nav aria-label="Top" class="border-b border-gray-200">
        <div class="mx-auto container">
          <div class="flex h-16 items-center justify-between">
            <!-- Logo and site name -->
            <div class="flex justify-center md:justify-start">
              <nuxt-link to="/">
                <span class="sr-only">Company</span>
                <div class="flex items-center">
                  <svg class="h-8 w-auto mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#FF69B4" />
                        <stop offset="100%" stop-color="#FFA500" />
                      </linearGradient>
                    </defs>
                    <path d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z" fill="url(#gradient)"/>
                  </svg>
                  <h1 class="hidden text-gray-700 md:block font-bold">BUY REDDIT ACCOUNTS</h1>
                </div>
              </nuxt-link>
            </div>


            <!--  menu items -->
            <div class="flex items-center space-x-4">
              <nuxt-link to="/check" class="text-sm font-medium text-gray-700 hover:text-gray-800">Shadowban Checker</nuxt-link>
              <nuxt-link to="/support" class="text-sm font-medium text-gray-700 hover:text-gray-800">Support</nuxt-link>

              <!-- Cart -->
              <div class="ml-6 flow-root">
                <div  class="group -m-2 flex items-center p-2">
                  <SideBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
