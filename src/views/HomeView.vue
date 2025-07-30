<script lang="ts" setup>
import Archive from '@/components/Archive.vue';
import { ref } from 'vue';

// TODO: detect iframe theme both ways, depending on year loaded

const frame = ref()
const baseURL = location.origin
const frameSrc = ref(baseURL + '/PersonalSite2023')
const yearChange = async (year: string) => {
  frameSrc.value = baseURL + '/PersonalSite' + year
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

</script>

<template>
  <div id="CurrentSite" class="h-screen w-screen p-0 m-0 absolute left-0 top-0">
    <Transition>
      <iframe class="w-screen h-screen" style="pointer-events: all;" ref="frame"
        :src="frameSrc" @load="applyThemeToFrame" />
    </Transition>
  </div>

  <Archive @change="yearChange" />
</template>