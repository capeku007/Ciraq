<template>
  <div
    class="flex px-2.5 rounded-full max-w-4xl mx-auto border border-gray-300 p-2.5"
  >
    <!-- search bar 1 -->
    <div class="flex items-center mx-1 w-1/2">
      <label for="voice-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <Icon
            name="lucide:search"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
          ></Icon>
        </div>
        <input
          type="text"
          id="voice-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Temp tasks, keywords, or company"
          required
        />
      </div>
    </div>

    <div style="border-left: 2px solid gray; height: auto"></div>

    <!-- search bar 2 -->
    <div class="flex items-center mx-1 w-1/2">
      <label for="voice-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <Icon
            name="ic:outline-location-on"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
          ></Icon>
        </div>
        <input
          type="text"
          id="voice-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Location..."
          required
        />
      </div>
      <button
        type="submit"
        class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <Icon
          name="lucide:search"
          class="w-5 h-5 text-white dark:text-gray-400"
        ></Icon>
      </button>
    </div>
  </div>
</template>

