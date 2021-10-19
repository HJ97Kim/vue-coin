<template>
  <div class="title">{{ title }}</div>
</template>

<script>
export default {
  name: "Title",
  props: ["title"]
}
</script>

<style>
  .title {
    font-size: 40px;
    font-weight: bold;
  }
</style>
