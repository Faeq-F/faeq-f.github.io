<script>
import { onMounted } from 'vue';
import { computed, ref } from 'vue'
import { useShepherd } from 'vue-shepherd'



import jQuery from "jquery";
const $ = jQuery;
window.$ = $;


export default {
  setup() {

    const tour = useShepherd({});

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

      tour.addStep({
        attachTo: { element: '#archiveButton', on: 'top' },
        text: 'Hover here to view the Archive;<br />🗃️ previous versions of this site!',
        buttons: [
          {
            text: 'Got it!',
            action: tour.hide,
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

    let chevron = computed(() => {
      return showing.value
        ? "w-5 h-5 text-gray-400/70 rotate-90 inline transition-all transform delay-[50ms]"
        : "-rotate-90 inline transition-all transform w-5 h-5 text-gray-400/70 delay-1000"
    })

    let position = computed(() => {
      return showing.value
        ? "w-screen absolute bottom-0 right-0 transition-all duration-500"
        : "w-screen absolute -bottom-[20rem] right-0 transition-all duration-500"
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
  <div :class="position">
    <div class="relative z-[99]">
      <div class="fixed inset-0 overflow-hidden" style="pointer-events: none;">
        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div :class="position" style="pointer-events: all !important;">
            <button @click="toggle"
              class="bg-white border rounded-lg shadow-sm p-1 pr-3 relative ml-4 rounded-b-none font-normal border-b-0 text-sm transition-all duration-700 delay-300"
              :class="showing ? '' : 'hover:opacity-100 opacity-0'"
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
            <div
              class="flex flex-col h-[20rem] py-5 bg-white border shadow-sm  rounded-lg m-4 my-0 overflow-y-hidden rounded-b-none rounded-tl-none">

              <div class="relative flex-1 px-4 mt-1 sm:px-5">
                <div class="absolute inset-0 px-4 sm:px-5">
                  <div
                    class="relative h-full sm:overflow-y-hidden overflow-y-scroll overflow-x-hidden sm:overflow-x-scroll border border-dashed rounded-md border-neutral-300">
                    <ol class="sm:flex h-full p-4">
                      <li class="relative min-w-96 mb-6 sm:mb-0">
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
                      <li class="relative min-w-96 mb-6 sm:mb-0">
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
                      <li class="relative min-w-96 mb-6 sm:mb-0">
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
                      <li class="relative min-w-96 mb-6 sm:mb-0">
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
                      <li class="relative min-w-96 mb-6 sm:mb-0">
                        <div
                          class="text-base font-normal text-gray-500 dark:text-gray-400 h-[11rem] mb-5">
                          <div class="SitePreviewContainer">
                            <div class="SitePreviewCard inProgress"
                              id="2025IMG">
                              <img class="cursor-pointer"
                                src="/inProgress.png" />
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");

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
// .SitePreviewContainer {
//   padding: 10px;
//   position: relative;
//   z-index: 10;
//   perspective: 1000px;
// }

// .SitePreviewCard {
//   width: 300px;
//   height: 169px;
//   position: relative;
//   background: white;
//   border-radius: 20px;
//   transform-style: preserve-3d;
//   transition: all 0.2s ease;
// }

// .SitePreviewCard:hover {
//   border: 1px solid #9999994f;
// }

.SitePreviewCard:hover img,
.SitePreviewCard img:hover {
  // transform: translateY(-0.65rem) translateX(0.65rem);
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

// .SitePreviewCard::before {
//   position: absolute;
//   top: 0;
//   left: -75%;
//   z-index: 2;
//   display: none;
//   content: '';
//   width: 50%;
//   height: 100%;
//   background: -webkit-linear-gradient(left,
//       rgba(255, 255, 255, 0) 0%,
//       rgba(255, 255, 255, 0.3) 100%);
//   background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
//   -webkit-transform: skewX(-25deg);
//   transform: skewX(-25deg);
// }

// .SitePreviewCard:hover::before {
//   display: block;
//   -webkit-animation: shine 0.75s;
//   animation: shine 0.75s;
// }


// @-webkit-keyframes shine {
//   0% {
//     left: -75%;
//   }

//   100% {
//     left: 125%;
//   }
// }

// @keyframes shine {
//   0% {
//     left: -75%;
//   }

//   100% {
//     left: 125%;
//   }
// }

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

.dark .SitePreviewCard {
  background-color: #0f172b;
  border: 1px solid oklch(44.6% 0.03 256.802);
  box-shadow: 0 2px 0 1px oklch(44.6% 0.03 256.802);

  &:hover {
    box-shadow: 0 1px 0 0.5px oklch(44.6% 0.03 256.802);
  }
}

* {
  scrollbar-width: thin !important;
  scrollbar-color: gray transparent !important;
}
</style>