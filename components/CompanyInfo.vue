<template>
  <div class="bg-white shadow-xl rounded-lg text-gray-900 pb-10 relative">
    <div class="rounded-t-lg h-32 overflow-hidden">
      <img
        class="object-cover object-top w-full"
        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        alt="Mountain"
      />
    </div>
    <div
      class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
    >
      <img
        class="object-cover object-center h-32"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        alt="Woman looking front"
      />
    </div>
    <div class="text-center mt-2">
      <h2 class="font-semibold text-lg">Company name</h2>
      <p class="text-gray-500">Address | Number</p>
    </div>
    <div class="m-4">
      <h2 class="font-semibold text-lg">Our Story</h2>
      <p class="text-gray-500 text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi nam
        veritatis perferendis deleniti ex consequatur dolores excepturi, alias
        quod dignissimos vitae. Rerum error, repudiandae recusandae fuga
        aspernatur necessitatibus tempore porro veritatis ipsam corrupti
        reiciendis consequuntur expedita, eveniet itaque accusamus non id quam
        natus nam, laborum sunt amet at explicabo autem! Cumque numquam
        doloribus possimus sint voluptatibus explicabo omnis, unde amet ea
        corporis aliquam adipisci, nostrum eaque facere consequatur accusantium
        vitae totam asperiores, nobis nulla tenetur vero error.
      </p>
    </div>
    <div class="mx-4 mt-2">
      <p class="font-semibold my-2 text-lg">Company Details</p>
      <div class="flex">
        <div class="w-1/2">
          <h4 class="font-semibold">Headquarters</h4>
          <p>Accra Ghana</p>
        </div>
        <div class="w-1/2">
          <h4 class="font-semibold">Industry</h4>
          <p>Technology</p>
        </div>
      </div>
      <div class="flex mt-2">
        <div class="w-1/2">
          <h4 class="font-semibold">Employees</h4>
          <p>40</p>
        </div>
        <div class="w-1/2">
          <h4 class="font-semibold">Socials</h4>
          <div>
            <i class="bx bxl-facebook border-2 border-gray-500 rounded-md p-1 mr-4"></i>
            <i class="bx bxl-instagram border-2 border-gray-500 rounded-md p-1"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed top-4 right-4 z-10">
      <button @click="closeModal" class="m-2 bg-gray-200 text-red-400 rounded-full w-8 h-8 flex items-center justify-center ">
        <i class="bx bx-x text-2xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup>

const { showClosableModal, hideModal } = useModal();


const closeModal = () => {
  // Initialize useModal composable
  const modalId = "viewCompanyInfo";
  hideModal(modalId);
};

</script>