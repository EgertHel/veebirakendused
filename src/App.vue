<template>
  <CustomHeader></CustomHeader>
  <router-view/>
  <CustomFooter></CustomFooter>
</template>

<script>
import CustomHeader from "@/components/Header.vue"
import CustomFooter from "@/components/Footer.vue"

export default {
  name: "App",
  components: {
    CustomHeader,
    CustomFooter,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin: 0;
  padding: 0;
}
</style>
