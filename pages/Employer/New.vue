<template>
    <div>
        new
    </div>
</template>

<script setup>
useHead({
  title: "Create new listing",
  meta: [{ name: "description", content: "Create new listing" }],
});

// Define loginData using reactive
definePageMeta({
//   middleware: ["already-auth"],
  layout: "company",
});

const { showClosableModal, hideModal } = useModal();


const closeModal = () => {
  // Initialize useModal composable
  const modalId = "viewCompanyInfo";
  hideModal(modalId);
};

</script>