<script lang="ts" setup>
import Archive from '@/components/Archive.vue';
import { sleep } from '@/stores/store';
import { onMounted, ref, watch } from 'vue';

// TODO: detect iframe theme both ways, depending on year loaded
const darkTheme = ref(false);
const year = ref('2023');
const frame = ref()
const baseURL = location.origin
const frameSrc = ref(baseURL + '/PersonalSite2023')
const yearChange = async (toYear: string) => {
  frame.value.style.opacity = 0
  await sleep(300)
  year.value = toYear
  frameSrc.value = baseURL + '/PersonalSite' + toYear
  await sleep(300)
  frame.value.style.opacity = 1
}

function addThemeEventListener(year: string) {
  if (year === '2022' || year === '2023')
    frame.value.contentDocument.body.getElementsByClassName('switch__input')[0].addEventListener('click', setThemeBasedOn20222023());
}

function setThemeBasedOn20222023() {
  if (frame.value.contentDocument.body.getElementsByClassName('switch__input')[0].value === 'on') {
    darkTheme.value = true;
  } else {
    darkTheme.value = false;
  }
}

function checkTheme(year: string) {
  console.log(year)
  if (year === '2020' || year === '2021') darkTheme.value = false
  else if (year === '2022' || year === '2023') setThemeBasedOn20222023()
}

//applying the right theme to the page in the iframe and showing the frame
function applyThemeToFrame() {
  addThemeEventListener(year.value);
  checkTheme(year.value);
  //open external links in a new tab
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

watch(darkTheme, () => {
  console.log('Theme changed;', darkTheme.value);
});

onMounted(() => {
  console.log(frame.value)
});

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

<style>
iframe {
  opacity: 1;
  transition-duration: 300ms;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
</style>