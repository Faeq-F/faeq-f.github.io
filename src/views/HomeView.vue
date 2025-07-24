<script lang="ts">
import Archive from '@/components/Archive.vue';
import { onMounted, ref, watch } from 'vue';

//detect iframe theme both ways

export default {
  setup() {
    const frame = ref(null)
    //applying the right theme to the page in the iframe and showing the frame
    function applyThemeToAPIFrame() {
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
        }
      }
    }

    //used to detect iframe url change - run callback before iframe loads new doc
    function iframeURLChange(iframe, callback) {
      var unloadHandler = function () {
        // Timeout needed because the URL changes immediately after
        // the `unload` event is dispatched.
        setTimeout(function () {
          callback(iframe, iframe.contentWindow.location.href);
        }, 0);
      };
      function attachUnload() {
        // Remove the unloadHandler in case it was already attached.
        // Otherwise, the change will be dispatched twice.
        iframe.contentWindow.removeEventListener("unload", unloadHandler);
        iframe.contentWindow.addEventListener("unload", unloadHandler);
      }
      iframe.addEventListener("load", attachUnload);
      attachUnload();
    }

    onMounted(() => {
      //when the iframe has loaded the site, apply theme and show it
      frame.value.addEventListener("load", applyThemeToAPIFrame);
      //when user switches page theme, change theme of archive as well
      //watch(themeHandler.selectedTheme, async (_newTheme, _oldTheme) => applyThemeToAPIFrame())
      //hide the iframe when the url changes since the theme needs to be applied (prevents flashing of white bg when in dark mode)
      iframeURLChange(frame.value, function (iframe, url) {
        applyThemeToAPIFrame();
      });



    })

    return {
      frame,
    };
  }
};

</script>

<template>
  <div id="CurrentSite" class="h-screen w-screen p-0 m-0 absolute left-0 top-0">
    <iframe class="w-full h-full" style="pointer-events: all;" ref="frame"
      src="https://faeq-f.github.io/PersonalSite2023"></iframe>
  </div>

  <Archive />
</template>

<style scoped></style>