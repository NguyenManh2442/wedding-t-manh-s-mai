<template>
  <div class="beian">
    <a href="https://www.facebook.com/nguyenmanh2442.nt">{{ beiAnText }}</a>
  </div>
</template>

<script>
export default {
  data() {
    let beiAnText = 'by ntm';
    return {
      beiAnText
    }
  }
}
</script>

<style scoped lang="less">
.beian {
  z-index: 100;
  position: fixed;
  bottom: 1em;
  width: 100%;
  text-align: center;

  a {
    color: white;
    text-decoration: underline;
  }
}
</style>
