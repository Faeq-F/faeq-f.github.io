<script>
import { onMounted } from 'vue';
import { computed, ref } from 'vue'

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;


export default {
  setup() {
    onMounted(() => {
      window.addEventListener('load', (event) => {
        let siteImages = $('#2020IMG, #2021IMG, #2022IMG, #2023IMG, #2025IMG')
        siteImages.each(function (index) {
          $(this).on("click", () => { loadPage($(this)[0].id.slice(0, -3)) })
        }
        )
      })

      function loadPage(year) {
        console.log(year)
        $.ajax({
          url: 'https://faeq-f.github.io/PersonalSite' + year,
          success: function (result) {
            var head = result.match(/<head[^>]*>[\s\S]*<\/head>/gi);
            var body = result.match(/<body[^>]*>[\s\S]*<\/body>/gi);
            console.log(head)
            console.log(body)
            $('head').html(head)
            $('#CurrentSite').html(body)
          },
        })
      }
    })

    let showing = ref(false)
    function toggle() {
      showing.value = !showing.value
    }

    let chevron = computed(() => {
      return showing.value
        ? "w-5 h-5 text-gray-400/70 rotate-90 inline transition-all transform delay-[50ms]"
        : "-rotate-90 inline transition-all transform w-5 h-5 text-gray-400/70 delay-1000"
    })

    let position = computed(() => {
      return showing.value
        ? "w-screen absolute bottom-0 right-0 transition-all duration-500"
        : "w-screen absolute -bottom-[19rem] right-0 transition-all duration-500"
    })

    let bg = computed(() => {
      return showing.value
        ? "h-screen w-screen absolute top-0 left-0 bg-black bg-opacity-50 transition-all duration-500"
        : "h-screen w-screen absolute top-0 left-0 bg-transparent transition-all duration-500"
    })

    return {
      showing,
      bg,
      position,
      chevron,
      toggle,
    };
  }
};
</script>

<template>
  <!-- <div :class="bg" @click="showing ? toggle() : () => { }"></div> -->
  <div :class="position">
    <div class="relative z-[99]">
      <div class="fixed inset-0 overflow-hidden" style="pointer-events: none;">
        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div :class="position" style="pointer-events: all !important;">
            <button @click="toggle"
              class="bg-white border rounded-lg shadow-sm p-1 pr-2 relative ml-4 rounded-b-none font-normal border-b-0 text-sm">

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
            <div
              class="flex flex-col h-[19rem] py-5 bg-white border shadow-sm  rounded-lg m-4 my-0 overflow-y-hidden rounded-b-none rounded-tl-none">

              <div class="relative flex-1 px-4 mt-1 sm:px-5">
                <div class="absolute inset-0 px-4 sm:px-5">
                  <div
                    class="relative p-4 h-full sm:overflow-y-hidden overflow-y-scroll overflow-x-hidden sm:overflow-x-scroll border border-dashed rounded-md border-neutral-300">
                    <ol class="sm:flex h-full">
                      <li class="relative w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500 dark:text-gray-400 h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2020IMG" class="cursor-pointer"
                                src="/PersonalSite2020.png" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                          </div>
                          <div
                            class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2020</time>
                        </div>
                      </li>
                      <li class="relative w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500 dark:text-gray-400 h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2021IMG" class="cursor-pointer"
                                src="/PersonalSite2021.png" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                          </div>
                          <div
                            class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2021</time>
                        </div>
                      </li>
                      <li class="relative w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500 dark:text-gray-400 h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2022IMG" class="cursor-pointer"
                                src="/PersonalSite2022.png" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                          </div>
                          <div
                            class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022</time>
                        </div>
                      </li>
                      <li class="relative w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500 dark:text-gray-400 h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard">
                              <img id="2023IMG" class="cursor-pointer"
                                src="/PersonalSite2023.png" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                          </div>
                          <div
                            class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023</time>
                        </div>
                      </li>
                      <li class="relative w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500 dark:text-gray-400 h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard inProgress" id="2025IMG">
                              <img class="cursor-pointer"
                                src="https://images.unsplash.com/photo-1553880376-2dec478c8e3b?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                          </div>
                          <div
                            class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700">
                          </div>
                        </div>
                        <div class="mt-3 sm:pe-8">
                          <time
                            class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2025</time>
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


<style scoped lang="scss">
.inProgress {
  cursor: pointer;
}

.inProgress img {
  display: none;
}

.inProgress::before {
  content: 'In Development' !important;
  position: absolute !important;
  display: block !important;
  animation: none !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: auto !important;
  height: auto !important;
}

.SitePreviewContainer {
  padding: 10px;
  position: relative;
  z-index: 10;
  perspective: 1000px;
}

.SitePreviewCard {
  width: 300px;
  height: 169px;
  position: relative;
  background: white;
  border-radius: 20px;
  transform-style: preserve-3d;
  transition: all 0.2s ease;
}

.SitePreviewCard:hover {
  border: 1px solid #9999994f;
}

.SitePreviewCard:hover img,
.SitePreviewCard img:hover {
  /* box-shadow: -0.65rem 0.65rem 0 #9999994f; */
  transform: translateY(-0.65rem) translateX(0.65rem);
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

.SitePreviewCard::before {
  position: absolute;
  top: 0;
  left: -75%;
  z-index: 2;
  display: none;
  content: '';
  width: 50%;
  height: 100%;
  background: -webkit-linear-gradient(left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%);
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
  -webkit-transform: skewX(-25deg);
  transform: skewX(-25deg);
}

.SitePreviewCard:hover::before {
  display: block;
  -webkit-animation: shine 0.75s;
  animation: shine 0.75s;
}


@-webkit-keyframes shine {
  0% {
    left: -75%;
  }

  100% {
    left: 125%;
  }
}

@keyframes shine {
  0% {
    left: -75%;
  }

  100% {
    left: 125%;
  }
}

* {
  scrollbar-width: thin !important;
  scrollbar-color: transparent transparent !important;
}
</style>
