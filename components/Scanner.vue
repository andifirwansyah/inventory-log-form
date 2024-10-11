<template>
    <div class="scanner">
      <!-- <qrcode-stream @detect="onDetect" @decode="onDecode" @init="onInit" class="w-full h-auto max-w-md mx-auto"></qrcode-stream> -->
      <qrcode-stream
        @detect="onDetect"
        :formats="selectedBarcodeFormats"
        @camera-on="onCameraReady"
        class="rounded-lg h-full mt-5"
      ></qrcode-stream>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { QrcodeStream } from "vue-qrcode-reader";
  
  

  const decodedResult = ref(null);
  const errorMessage = ref("");
  
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
  
    error.value = "";
  };
  
  const onDecode = (result) => {
    decodedResult.value = result;
  };
  
  const onDetect = (code) => {
    console.log(code);
    decodedResult.value = JSON.stringify(code.map((v) => v.rawValue))
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
  