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

    const showing = ref(false)
    const fullyHidden = ref(true)

    // Horizontal scroll dragging state
    const scrollContainer = ref(null)
    const isDragging = ref(false)
    const startX = ref(0)
    const scrollLeftStart = ref(0)
    const canScrollLeft = ref(false)
    const canScrollRight = ref(true)
    let velocity = 0
    let lastX = 0
    let lastTime = 0

    function toggle() {
      showing.value = !showing.value
      if (showing.value) {
        fullyHidden.value = false
      }
      else {
        setTimeout(() => {
          fullyHidden.value = true
        }, 500) // Corresponds to duration-500
      }
    }

    // Check scroll position to show/hide arrows
    function updateScrollButtons() {
      if (!scrollContainer.value) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
      canScrollLeft.value = scrollLeft > 0
      canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1
    }

    // Drag handlers
    function onMouseDown(e) {
      if (!scrollContainer.value) return
      isDragging.value = true
      startX.value = e.pageX - scrollContainer.value.offsetLeft
      scrollLeftStart.value = scrollContainer.value.scrollLeft
      lastX = e.pageX
      lastTime = Date.now()
      velocity = 0
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(e) {
      if (!isDragging.value || !scrollContainer.value) return
      e.preventDefault()
      const x = e.pageX - scrollContainer.value.offsetLeft
      const walk = (x - startX.value) * 1.5 // scroll speed multiplier
      scrollContainer.value.scrollLeft = scrollLeftStart.value - walk
      updateScrollButtons()

      // Calculate velocity for momentum
      const now = Date.now()
      const dt = now - lastTime
      if (dt > 0) {
        velocity = (e.pageX - lastX) / dt
      }
      lastX = e.pageX
      lastTime = now
    }

    function onMouseUp() {
      isDragging.value = false
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)

      // Apply momentum scrolling
      if (scrollContainer.value && Math.abs(velocity) > 0.1) {
        const momentum = velocity * 200 // momentum multiplier
        scrollContainer.value.scrollTo({
          left: scrollContainer.value.scrollLeft - momentum,
          behavior: 'smooth'
        })
      }
    }

    // Navigation buttons
    function scrollLeft() {
      if (!scrollContainer.value) return
      scrollContainer.value.scrollBy({ left: -384, behavior: 'smooth' })
      setTimeout(updateScrollButtons, 300)
    }

    function scrollRight() {
      if (!scrollContainer.value) return
      scrollContainer.value.scrollBy({ left: 384, behavior: 'smooth' })
      setTimeout(updateScrollButtons, 300)
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
      const baseClasses = "absolute transition-all duration-500"
      if (showing.value) {
        return `w-screen bottom-0 right-0 ${baseClasses} ${darkThemeGlobal}`
      }
      return `${fullyHidden.value ? 'w-fit' : 'w-screen'} -bottom-[20rem] left-[-98vw] ${baseClasses} ${darkThemeGlobal}`
    })

    // Initialize scroll button state on mount
    onMounted(() => {
      updateScrollButtons()
    })

    return {
      showing,
      bg,
      color,
      border,
      position,
      chevron,
      toggle,
      props,
      scrollContainer,
      isDragging,
      onMouseDown,
      scrollLeft,
      scrollRight,
      canScrollLeft,
      canScrollRight,
      updateScrollButtons
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
                  <!-- Left Arrow -->
                  <button @click="scrollLeft"
                    class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300"
                    :class="[props.darkTheme ? 'bg-gray-800 text-white hover:bg-gray-700 border-[#90a1b9]' : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300', canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"
                    style="pointer-events: all;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <!-- Right Arrow -->
                  <button @click="scrollRight"
                    class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300"
                    :class="[props.darkTheme ? 'bg-gray-800 text-white hover:bg-gray-700 border-[#90a1b9]' : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300', canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"
                    style="pointer-events: all;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div id="archiveListDiv" ref="scrollContainer"
                    @mousedown="onMouseDown" @scroll="updateScrollButtons"
                    class="relative h-full sm:overflow-y-hidden overflow-y-scroll overflow-x-hidden sm:overflow-x-scroll border border-dashed rounded-md cursor-grab select-none no-scrollbar"
                    :class="{ 'cursor-grabbing': isDragging }">
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
                              id="2026IMG">
                              <img class="cursor-pointer" src="/inProgress.png"
                                @click="$emit('change', '2026')" />
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
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 ">2026</time>
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

/* Hide scrollbar for archive list while keeping functionality */
#archiveListDiv::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

#archiveListDiv {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

/* Utility class to hide scrollbars */
.no-scrollbar::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.no-scrollbar {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

/* Prevent text selection during drag */
#archiveListDiv,
#archiveListDiv * {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
}

/* Prevent native image dragging */
#archiveListDiv img {
  -webkit-user-drag: none !important;
  -khtml-user-drag: none !important;
  -moz-user-drag: none !important;
  -o-user-drag: none !important;
  user-drag: none !important;
  pointer-events: auto !important;
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