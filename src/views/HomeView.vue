<script lang="ts" setup>
import Archive from '@/components/Archive.vue';
import { sleep } from '@/stores/store';
import { onMounted, ref } from 'vue';

const year = ref('2023');
const darkTheme = ref(false);

const frame = ref()
const baseURL = location.origin
const frameSrc = ref(baseURL + '/PersonalSite2023')

// before iframe load event
const yearChange = async (toYear: string) => {
  frame.value.style.opacity = 0
  await sleep(300)
  year.value = toYear
  frameSrc.value = baseURL + '/PersonalSite' + toYear
  await sleep(300)
  frame.value.style.opacity = 1
}

// on iframe load event
function frameLoad() {
  setArchiveTheme(year.value);
  addThemeEventListener(year.value);
  //open external links in a new tab
  for (var a of frame.value.contentDocument.body.getElementsByTagName(
    "a"
  )) {
    if (!a.href.includes("PersonalSite")) {
      a.target = "_blank";
    } else {
      a.addEventListener("click", () => {
        frameLoad()
      });
    }
  }
}

function addThemeEventListener(year: string) {
  if (year === '2022' || year === '2023')
    frame.value.contentDocument.body.getElementsByClassName('switch__input')[0].addEventListener('click',
      () => setArchiveTheme20222023()
    );
}

function setArchiveTheme(year: string) {
  if (year === '2020' || year === '2021') darkTheme.value = false
  else if (year === '2022' || year === '2023') setArchiveTheme20222023()
}

function setArchiveTheme20222023() {
  if (frame.value.contentDocument.body.getElementsByClassName('switch__input')[0].checked) {
    darkTheme.value = true;
  } else {
    darkTheme.value = false;
  }
}

onMounted(() => {
  console.log(frame.value)
});

</script>

<template>
  <div id="CurrentSite" class="h-screen w-screen p-0 m-0 absolute left-0 top-0">
    <Transition>
      <iframe class="w-screen h-screen" style="pointer-events: all;" ref="frame"
        :src="frameSrc" @load="frameLoad" />
    </Transition>
  </div>

  <Archive @change="yearChange" :darkTheme="darkTheme" />
</template>

<style>
iframe {
  opacity: 1;
  transition-duration: 300ms;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
</style>