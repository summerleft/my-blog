<template>
  <div>
    <blog-header></blog-header>
    <router-view></router-view>
  </div>
</template>

<script>
import BlogHeader from "../components/BlogHeader";

export default {
  name: "Layout",
  components: {
    BlogHeader,
  }
}
</script>

<style scoped>

</style>