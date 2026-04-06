<script setup lang="ts">

/// This view is used only for debug purposes

function setLightMode() {
  document.documentElement.classList.remove('dark');
}

function setDarkMode() {
  document.documentElement.classList.add('dark');
}

</script>
<template>
  <div class="p-4">
    This page emulates actions of the 2026 site

    <div class="mt-4 flex gap-2">
      <span>Theme:</span>
      <button @click="setLightMode"
        class="px-3 py-1 bg-white text-black border border-gray-300 rounded hover:bg-gray-100">Light</button>
      <button @click="setDarkMode"
        class="px-3 py-1 bg-gray-900 text-white border border-gray-700 rounded hover:bg-gray-800">Dark</button>
    </div>
  </div>

  <div class="absolute bottom-0 left-[50%] translate-x-[-50%] hover:underline">
    credits text</div>
</template>