<script setup lang="ts">

/// This view is used only for debug purposes

</script>
<template>
  <div>
    This page emulates a subpage of a site
  </div>
  <div>
    <a href="https://github.com/faeq-f">link to an external site</a>
  </div>
  <div>
    <RouterLink to="/PersonalSite2021">link back to 2021</RouterLink>
  </div>
  <div>
    <RouterLink to="/PersonalSite2025">link back to 2025</RouterLink>
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