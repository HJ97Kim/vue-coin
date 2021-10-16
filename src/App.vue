<template>
  <div id="app">
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

  @font-face {
    font-family: 'PFStardust';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/PFStardust.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: auto;
    font-family: 'PFStardust';
    text-align: center;
    background: #202124;
    color: #248C45;
  }

  #content {
    width: 100vw;
    height: 100vh;
  }
</style>
