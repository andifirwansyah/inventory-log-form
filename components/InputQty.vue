<template>
    <div class="mt-5">
      <label class="text-[#7C7C7C] ml-1 font-inter font-medium">Qty</label>
      <div class="flex items-center border border-[#F1F1F1] bg-[#F1F1F1] rounded-md px-2 mt-0.5">
        <input
          type="number"
          :value="quantity"
          @input="onInput"
          @keypress="allowOnlyDigits"
          class="block w-full bg-[#F1F1F1] p-3 focus:outline-none no-arrows"
        />
        <button type="button" @click="decrement" class="focus:outline-none mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#6B6B6B]">
            <path fill-rule="evenodd" d="M6 12a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button type="button" @click="increment" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#6B6B6B]">
            <path fill-rule="evenodd" d="M12 6a1 1 0 0 1 1 1v5h5a1 1 0 0 1 0 2h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5V7a1 1 0 0 1 1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    quantity: {
      type: Number,
      required: true
    }
  });
  const emit = defineEmits(['update:quantity']);
  
  const increment = () => {
    emit('update:quantity', props.quantity + 1);
  };
  
  const decrement = () => {
    if (props.quantity > 0) {
      emit('update:quantity', props.quantity - 1);
    }
  };
  
  const onInput = (event) => {
    const value = Math.max(0, Number(event.target.value) || 0);
    emit('update:quantity', value);
  };
  
  const allowOnlyDigits = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };
  </script>
  <style scoped>
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  </style>