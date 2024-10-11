<template>
    <div class="relative w-full mt-5">
      <label class="text-[#7C7C7C] ml-1 font-inter font-medium">{{ label }}</label>
      <div
        class="flex items-center border border-[#F1F1F1] bg-[#F1F1F1] rounded-md px-2 mt-0.5"
      >
        <!-- <input
          type="text"
          :placeholder="placeholder"
          v-model="selected"
          @focus="toggleDropdown(true)"
          @blur="handleInputBlur"
          class="block w-full bg-[#F1F1F1] p-3 focus:outline-none"
        /> -->
        <div @click="toggleDropdown(!isOpen)" class="w-full bg-[#F1F1F1] h-12 flex items-center">{{ value }}</div>
        <svg
          v-if="isOpen"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 text-[#6B6B6B]"
        >
          <path
            fill-rule="evenodd"
            d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 text-[#6B6B6B]"
        >
          <path
            fill-rule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
  
      <div
        v-if="isOpen"
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto"
      >
        <div class="p-2">
          <input
            type="text"
            placeholder="Cari Zona..."
            v-model="search"
            @focus="toggleDropdown(true)"
            class="block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>
  
        <ul>
          <li
            v-for="(option, index) in filteredOptions"
            :key="index"
            @click="selectOption(option)"
            class="cursor-pointer p-2 hover:bg-blue-100"
          >
            {{ option.label }}
          </li>
        </ul>
  
        <div v-if="filteredOptions.length === 0" class="p-2 text-gray-500">
          Tidak ada opsi ditemukan
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from "vue";
  
  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Pilih Zona",
    },
    label: {
      type: String,
    },
    value: {
      type: String,
      required: true
    }
  });

  const emit = defineEmits(['update:value']);
  
  const search = ref("");
  const selected = ref("");
  const isOpen = ref(false);
  const selectedOption = ref(null);
  
  const filteredOptions = computed(() => {
    return props.options.filter((option) =>
      option.label.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  const selectOption = (option) => {
    selectedOption.value = option.value;
    selected.value = option.label;
    emit('update:value', option.label);
    isOpen.value = false;
  };
  
  const handleInputBlur = (event) => {
    const target = event.relatedTarget;
    if (!target || !target.closest(".absolute")) {
      setTimeout(() => {
        isOpen.value = false;
      }, 100);
    }
  };
  
//   const handleClickOutside = (event) => {
//     const target = event.target;
//     const dropdown = document.querySelector(".relative");
  
//     if (isOpen.value && dropdown && !dropdown.contains(target)) {
//       isOpen.value = false;
//     }
//   };
  
//   onMounted(() => {
//     window.addEventListener("click", handleClickOutside);
//   });
  
//   onBeforeUnmount(() => {
//     window.removeEventListener("click", handleClickOutside);
//   });
  
  const toggleDropdown = (status) => {
    isOpen.value = status;
  };
  </script>
  