<script lang="ts" setup>
import Archive from '@/components/Archive.vue';
import { ref } from 'vue';

// TODO: detect iframe theme both ways, depending on year loaded

const show = ref(true);
const frame = ref()
const baseURL = location.origin
const frameSrc = ref(baseURL + '/PersonalSite2023')
const yearChange = async (year: string) => {
  frame.value.style.opacity = 0
  await sleep(300)
  frameSrc.value = baseURL + '/PersonalSite' + year
  await sleep(300)
  frame.value.style.opacity = 1
}

//applying the right theme to the page in the iframe and showing the frame
function applyThemeToFrame() {
  // frame.value.contentDocument.getElementsByTagName(
  //   "html"
  // )[0].dataset.bsTheme = themeHandler.selectedTheme.value;

  //open external links in a new tab
  console.log(frame.value)
  for (var a of frame.value.contentDocument.body.getElementsByTagName(
    "a"
  )) {
    if (!a.href.includes("PersonalSite")) {
      a.target = "_blank";
    } else {
      a.addEventListener("click", () => {
        applyThemeToFrame()
      });
    }
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<template>
  <div id="CurrentSite" class="h-screen w-screen p-0 m-0 absolute left-0 top-0">
    <Transition>
      <iframe class="w-screen h-screen" style="pointer-events: all;" ref="frame"
        :src="frameSrc" @load="applyThemeToFrame" v-if="show" />
    </Transition>
  </div>

  <Archive @change="yearChange" />
</template>

<style>
iframe {
  opacity: 1;
  transition-duration: 300ms;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
</style>