<template>
  <div class="relative w-full mt-5">
    <label class="text-[#7C7C7C] ml-1 font-inter font-medium">{{label}}</label>
    <div class="flex items-center border border-[#F1F1F1] bg-[#F1F1F1] rounded-md px-2 mt-0.5">
      <input
        type="text"
        placeholder="Barcode"
        :value="value"
        @input="handleInputBarcode"
        class="block w-full bg-[#F1F1F1] p-3 focus:outline-none"
      />
      <button type="button" class="mr-2" @click="showModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clip-rule="evenodd" />
          </svg>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
         <path fill-rule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
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
        <div v-if="decodedResult" class="text-red-500">{{ decodedResult }}</div>
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { QrcodeStream } from "vue-qrcode-reader";

const showModal = ref(false);
const decodedResult = ref(null);
const errorMessage = ref("");

defineProps({
    label: {
      type: String,
    },
    value: {
      type: String,
      required: true
    }
});

const emit = defineEmits(['update:value']);

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

  const onDetect = (code) => {
    const detectedCode = code.map((v) => v.rawValue)[0].toString();
    decodedResult.value = detectedCode;
    emit('update:value', detectedCode);
    setTimeout(() => {
        showModal.value = false;
    }, 1000);
  };

  const onInit = async (promise) => {
    try {
      await promise;
    } catch (error) {
      errorMessage.value =
        "Failed to access the camera. Please ensure permissions are granted.";
      console.error("Initialization error:", error);
    }
  };
  

</script>

<style scoped>
.scanner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>