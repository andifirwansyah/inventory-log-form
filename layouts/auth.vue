<template>
    <div class="mx-auto lg:max-w-sm w-full min-h-screen bg-bluemary">
        <slot />
    </div>
</template>
<script setup>
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }
  ]
})
</script>