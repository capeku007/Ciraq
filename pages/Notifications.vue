<template>
  <div
    class="container mx-auto my-5 p-5 max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl"
  >
    <div>
      <h3>Notifications</h3>
    </div>
    <div>
      <div class="w-full h-auto relative">
        <div
          class="bg-white px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear"
        >
          <div
            class="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer"
          >
            <div class="relative flex flex-shrink-0 items-end">
              <img
                class="h-16 w-16 rounded-full"
                src="https://i.pravatar.cc/300"
              />
              <!-- <span class="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span> -->
            </div>
            <div class="ml-3">
              <span class="font-semibold tracking-tight text-xs"
                >John Doe
              </span>
              <span class="text-xs leading-none opacity-50"
                >reacted to your comment:</span
              >
              <p class="text-xs leading-4 pt-2 italic opacity-70">
                "This is the comment lorem40..."
              </p>
              <span
                class="text-[10px] text-blue-500 font-medium leading-4 opacity-75"
                >a few seconds ago</span
              >
            </div>
            <div class="ml-3">
              <button
                class="-mr-1 bg-slate-100 hover:bg-red-600 text-slate-400 hover:text-white h-5 w-5 rounded-full flex justify-center items-center"
              >
                <svg
                  class="h-2 w-2 fill-current items-center"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>