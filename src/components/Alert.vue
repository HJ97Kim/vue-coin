<template>
  <b-alert class="alert" variant="danger" :show="showAlert" fade>{{ message }}</b-alert>
</template>

<script>
export default {
  name: "Alert",
  props: ["showAlert", "message"]
}
</script>

<style>
  .alert {
    position: absolute !important;
    top: 0;
    width: 100%;
  }
</style>
