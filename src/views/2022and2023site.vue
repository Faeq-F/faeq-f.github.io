<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

/// This view is used only for debug purposes

</script>
<template>
  <div class="overflow-y-scroll h-screen">
    This page emulates actions of the
    {{ router.currentRoute.value.path.includes('2023') ? '2023' : '2022' }}
    site
    <div>
      Theme <input id="themeSwitch" class="switch__input" type="checkbox"
        role="switch" />
    </div>
    <div>
      <router-link
        :to="{ path: router.currentRoute.value.path, hash: '#anchor' }">
        link to an anchor
      </router-link>
      <a href="https://github.com/faeq-f">
        link to an external site
      </a>
    </div>
    <p v-for="i in [...Array(100).keys()]">Content{{ i }}</p>
    <div id="anchor">An anchor</div>
    <p v-for="i in [...Array(50).keys()]">Content{{ i }}</p>
  </div>
</template>

<style scoped>
a {
  outline: black solid 1px;
  padding: 5px;
  margin: 20px;
}

div {
  margin: 20px;
}
</style>
<style>
body:has(.switch__input:checked) {
  filter: invert(1);
  background: #000;
}
</style>