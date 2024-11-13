<template>
    <div class="relative w-full mt-5">
      <label class="text-[#7C7C7C] ml-1 font-inter font-medium">{{ label }}</label>
      <div
        class="flex items-center border border-[#F1F1F1] bg-[#F1F1F1] rounded-md px-2 mt-0.5"
      >
        <input
          type="text"
          :placeholder="placeholder"
          :value="value"
          @focus="toggleDropdown(true)"
          @blur="handleInputBlur"
          class="block w-full bg-[#F1F1F1] p-3 focus:outline-none"
          readonly
        />
        <!-- <div @click="toggleDropdown(!isOpen)" class="w-full bg-[#F1F1F1] h-12 flex items-center">{{ value }}</div> -->
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
        <div class="p-2 flex items-center justify-between space-x-2">
          <input
            type="text"
            :placeholder="searchLabel"
            v-model="search"
            @input="onInput"
            @focus="toggleDropdown(true)"
            class="block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          />
          <button type="button" v-if="isBarcode" class="border border-gray-300 rounded-md p-2" @click="handleShowQRCode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
  
        <ul>
          <li
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
            class="cursor-pointer p-2 hover:bg-blue-100"
          >
            {{ option.label }}
          </li>
        </ul>
  
        <div v-if="options.length === 0" class="p-2 text-gray-500">
          Tidak ada opsi ditemukan
        </div>
      </div>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 h-screen">
        <div class="bg-white rounded-t-xl px-4 py-3 lg:max-w-sm w-full h-5/6 mx-auto bottom-0">
          <div class="flex items-center justify-between">
              <div class="font-inter text-bluemary font-semibold text-lg">Scan Barcode</div>
              <button type="button" @click="showModal = false">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
              </button>
          </div>
          <div class="scanner">
              <qrcode-stream
                  @detect="onDetect"
                  :formats="selectedBarcodeFormats"
                  @camera-on="onCameraReady"
                  class="rounded-lg mt-5"
              ></qrcode-stream>
          </div>
          <div v-if="decodedResult" class="text-green-500 text-center text-xs mt-3">{{ decodedResult }}</div>
          <div v-if="errorMessage" class="text-red-500 text-center text-xs mt-3">{{ errorMessage }}</div>
        </div>
      </div>

    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from "vue";
  import { QrcodeStream } from "vue-qrcode-reader";
  const supabase = useSupabaseClient();

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
    },
    searchLabel: {
      type: String,
      required: true
    },
    isBarcode: {
      type: Boolean,
      default: false,
      required: false
    }
  });

  const emit = defineEmits(['update:value', 'search']);
  
  const search = ref("");
  const selected = ref("");
  const isOpen = ref(false);
  const selectedOption = ref(null);
  const showModal = ref(false);
  const decodedResult = ref(null);
  const errorMessage = ref("");

//   const filteredOptions = computed(() => {
//     return props.options.filter((option) =>
//       option.label.toLowerCase().includes(search.value.toLowerCase())
//     );
//   });
  
  const onInput = () => {
    emit('search', search.value)
  }

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

  const barcodeFormats = ref({
    aztec: true,
    code_128: true,
    code_39: true,
    code_93: true,
    codabar: true,
    databar: true,
    databar_expanded: true,
    data_matrix: true,
    dx_film_edge: true,
    ean_13: true,
    ean_8: true,
    itf: true,
    maxi_code: true,
    micro_qr_code: true,
    pdf417: true,
    qr_code: true,
    rm_qr_code: true,
    upc_a: true,
    upc_e: true,
    linear_codes: true,
    matrix_codes: true,
  });
  const selectedBarcodeFormats = computed(() => {
    return Object.keys(barcodeFormats.value).filter(
      (format) => barcodeFormats.value[format]
    );
  });
  
  const defaultConstraintOptions = [
    { label: "rear camera", constraints: { facingMode: "environment" } },
    { label: "front camera", constraints: { facingMode: "user" } },
  ];
  const constraintOptions = ref(defaultConstraintOptions);
  
  const onCameraReady = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(({ kind }) => kind === "videoinput");
  
    constraintOptions.value = [
      ...defaultConstraintOptions,
      ...videoDevices.map(({ deviceId, label }) => ({
        label: `${label} (ID: ${deviceId})`,
        constraints: { deviceId },
      })),
    ];
  
    errorMessage.value = "";
  };
  
  const handleInputBarcode = (event) => {
    emit('update:value', event.target.value);
  }

  const onDetect = async (code) => {
    const detectedCode = code.map((v) => v.rawValue)[0].toString();
    const {data, error} = await supabase.from('master_products').select('*').eq('sku', detectedCode).single();
    if(error){
      errorMessage.value = "Barang tidak ditemukan"
      return
    }
    decodedResult.value = detectedCode;
    emit('update:value', data.sku + '-' + data.name);
    setTimeout(() => {
        showModal.value = false;
        isOpen.value = false;
    }, 1000);
  };

  const handleShowQRCode = () => {
    showModal.value = true
    decodedResult.value = ''
    errorMessage.value = ''
  }
  
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
  