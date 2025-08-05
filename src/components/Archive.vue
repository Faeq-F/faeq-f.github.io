<script>
import { onMounted } from 'vue';
import { computed, ref } from 'vue'
import { useShepherd } from 'vue-shepherd'
import { sleep } from '@/stores/store'

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;


export default {
  emits: ['change'],
  props: ['darkTheme'],
  setup(props, _ctx) {

    const tour = useShepherd({});

    async function endTour() {
      tour.hide();
      await sleep(300)
      tour.complete();
    }

    onMounted(() => {
      tour.addStep({
        attachTo: { element: '#archiveButton', on: 'top' },
        text: 'Hover here to view the Archive;<br />🗃️ previous versions of this site!',
        buttons: [
          {
            text: 'Got it!',
            action: endTour,
            secondary: true
          }
        ],
        arrow: { padding: 10 },
        modalOverlayOpeningRadius: 7
      });

      tour.start();
    })

    let showing = ref(false)
    function toggle() {
      showing.value = !showing.value
    }

    let bg = computed(() => {
      return props.darkTheme ? ' bg-black' : ' bg-white'
    })

    let color = computed(() => {
      return props.darkTheme ? ' text-[#e5e7eb]' : ''
    })

    let border = computed(() => {
      return props.darkTheme ? ' border-[#90a1b9]' : ''
    })

    let chevron = computed(() => {
      let color = props.darkTheme ? ' text-[#90a1b9]' : ' text-gray-400/70'
      return (showing.value
        ? "w-5 h-5 rotate-90 inline transition-all transform delay-[50ms]"
        : "-rotate-90 inline transition-all transform w-5 h-5 delay-1000") + color
    })

    let position = computed(() => {
      let darkThemeGlobal = props.darkTheme ? ' ArchiveDarkTheme' : ''
      return (showing.value
        ? "w-screen absolute bottom-0 right-0 transition-all duration-500"
        : "w-screen absolute -bottom-[20rem] right-0 transition-all duration-500")
        + darkThemeGlobal
    })

    return {
      showing,
      bg,
      color,
      border,
      position,
      chevron,
      toggle,
      props
    };
  }
};
</script>

<template>
  <div :class="position">
    <div class="relative z-[99]">
      <div class="fixed inset-0 overflow-hidden" style="pointer-events: none;">
        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div :class="position" style="pointer-events: all !important;">
            <button @click="toggle"
              class="border rounded-lg shadow-sm p-1 pr-3 relative ml-4 rounded-b-none font-normal border-b-0 text-sm "
              :class="(showing ? '' : 'hover:opacity-100 opacity-0') + bg + color + border"
              id="archiveButton">

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                :class="chevron">
                <g fill="none" stroke="none">
                  <path d="M10 8.013l4 4-4 4" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </g>
              </svg>
              Archive
            </button>
            <div id="archivePanel"
              class="flex flex-col h-[20rem] py-5 border shadow-sm  rounded-lg m-4 my-0 overflow-y-hidden rounded-b-none rounded-tl-none">

              <div class="relative flex-1 px-4 mt-1 sm:px-5">
                <div class="absolute inset-0 px-4 sm:px-5">
                  <div id="archiveListDiv"
                    class="relative h-full sm:overflow-y-hidden overflow-y-scroll overflow-x-hidden sm:overflow-x-scroll border border-dashed rounded-md">
                    <ol class="sm:flex h-full p-4">
                      <li class="relative min-w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500  h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2020IMG" class="cursor-pointer"
                                src="/PersonalSite2020.png"
                                @click="$emit('change', '2020')" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3  rounded-full -start-1.5 border archivePoint">
                          </div>
                          <div class="hidden sm:flex w-full archiveLine h-0.5">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 ">2020</time>
                        </div>
                      </li>
                      <li class="relative min-w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500  h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2021IMG" class="cursor-pointer"
                                src="/PersonalSite2021.png"
                                @click="$emit('change', '2021')" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3  rounded-full -start-1.5 border archivePoint">
                          </div>
                          <div class="hidden sm:flex w-full archiveLine h-0.5 ">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 ">2021</time>
                        </div>
                      </li>
                      <li class="relative min-w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500  h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2022IMG" class="cursor-pointer"
                                src="/PersonalSite2022dark.png"
                                v-if="props.darkTheme"
                                @click="$emit('change', '2022')" />
                              <img id="2022IMG" class="cursor-pointer"
                                src="/PersonalSite2022.png" v-else
                                @click="$emit('change', '2022')" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3  rounded-full -start-1.5 border archivePoint">
                          </div>
                          <div class="hidden sm:flex w-full archiveLine h-0.5 ">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 ">2022</time>
                        </div>
                      </li>
                      <li class="relative min-w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500  h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2023IMG" class="cursor-pointer"
                                src="/PersonalSite2023dark.png"
                                v-if="props.darkTheme"
                                @click="$emit('change', '2023')" />
                              <img id="2023IMG" class="cursor-pointer"
                                src="/PersonalSite2023.png" v-else
                                @click="$emit('change', '2023')" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 rounded-full -start-1.5 border archivePoint">
                          </div>
                          <div class="hidden sm:flex w-full archiveLine h-0.5 ">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 ">2023</time>
                        </div>
                      </li>
                      <li class="relative min-w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500  h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard inProgress"
                              id="2025IMG">
                              <img class="cursor-pointer" src="/inProgress.png"
                                @click="$emit('change', '2025')" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 rounded-full -start-1.5 border archivePoint ">
                          </div>
                          <div class="hidden sm:flex w-full archiveLine h-0.5 ">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 ">2025</time>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");

* {
  transition: 300ms all ease-in-out;
  scrollbar-width: thin !important;
  scrollbar-color: gray transparent !important;
}

body:has(div.ArchiveDarkTheme) {
  background-color: #000;
}

body:has(dialog.shepherd-element:not([hidden])) #archiveButton {
  opacity: 1;
}

#archiveButton,
time {
  font-weight: 300;
  font-family: Outfit,
    "Outfit Fallback: Arial",
    sans-serif;
}

.shepherd-button,
.shepherd-text {
  font-weight: 300;
  font-family: Outfit,
    "Outfit Fallback: Arial",
    sans-serif;
}

dialog.shepherd-element {
  margin-left: 10px;
  border-radius: 1rem;
  transform: translateY(-1rem);
}

dialog.shepherd-element[hidden] {
  animation: fadeTour .3s ease forwards !important;
}

[hidden]:where(:not([hidden="until-found"])) {
  display: block !important;
}

.shepherd-arrow:before {
  border: 1px solid #7a7c8085;
  border-left-color: transparent;
  border-top-color: transparent;
  border-radius: 4px;
}

.shepherd-button {
  border: 1px solid #7a7c80;
  border-radius: 0.75rem;
  padding: .5rem 1.5rem;
}

.archiveLine {
  background-color: #e5e7eb;
}

.archivePoint {
  background-color: #e5e7eb;
  border-color: #fff;
}

#archivePanel {
  background: #fff;
}

#archiveListDiv {
  border-color: #d4d4d4;
}

.ArchiveDarkTheme #archivePanel {
  border: 1px solid #90a1b9;
  border-bottom: 0;
  background-color: #000;
}

.ArchiveDarkTheme #archiveListDiv {
  border-color: #90a1b9;
}

.ArchiveDarkTheme .archiveLine {
  background-color: #90a1b9;
}

.ArchiveDarkTheme .archivePoint {
  background-color: #90a1b9;
  border-color: #000;
}

.shepherd-element {
  border: 1px solid #d4d4d4;
  box-shadow: none;
}

body:has(div.ArchiveDarkTheme) .shepherd-element {
  border: 1px solid #90a1b9;
  background-color: #000;
}

body:has(div.ArchiveDarkTheme) .shepherd-text {
  color: #90a1b9;
}

body:has(div.ArchiveDarkTheme) .shepherd-arrow:before {
  border-color: #90a1b9;
  background-color: #000;
  border-left-color: transparent;
  border-top-color: transparent;
}

body:has(div.ArchiveDarkTheme) .shepherd-button {
  border: 1px solid #7a7c80;
  background-color: #161616;
  color: #90a1b9;
}

body:has(div.ArchiveDarkTheme) .shepherd-button:hover {
  background-color: #202020 !important;
  color: #90a1b9 !important;
}

@keyframes fadeTour {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>

<style scoped lang="scss">
.SitePreviewCard:hover img,
.SitePreviewCard img:hover {
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}

.SitePreviewCard img {
  width: 300px;
  height: 169px;
  border-radius: 15px;
  transition: all 0.2s ease;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  border: 1px solid #9999994f;
}

.SitePreviewCard img {
  width: fit-content;
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid oklch(92.8% 0.006 264.531);
  box-shadow: 0 2px 0 1px oklch(92.8% 0.006 264.531);
  cursor: click,
    auto !important;
  font-family: var(--font-family-sans-serif);
  font-size: 0.75em;
  text-align: center;
  position: relative;
  top: -1px;
  margin-left: 7px;
  margin-right: 7px;

  &:hover {
    box-shadow: 0 1px 0 0.5px oklch(92.8% 0.006 264.531);
    top: 1px;
  }
}

.SitePreviewCard.inProgress img {
  opacity: 0.5;

  &:hover {
    opacity: 0.8;
  }
}

.ArchiveDarkTheme .SitePreviewCard img {
  background-color: #0f172b;
  border: 1px solid oklch(44.6% 0.03 256.802);
  box-shadow: 0 2px 0 1px oklch(44.6% 0.03 256.802);

  &:hover {
    box-shadow: 0 1px 0 0.5px oklch(44.6% 0.03 256.802);
  }
}

.ArchiveDarkTheme .SitePreviewCard.inProgress img {
  opacity: 0.8;
  filter: grayscale(100%) invert(100%);

  &:hover {
    opacity: 2;
    filter: grayscale(0%) invert(100%);
  }
}
</style>