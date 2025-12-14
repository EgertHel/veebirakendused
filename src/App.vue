<template>
  <CustomHeader></CustomHeader>
  <Navbar></Navbar>
  <router-view/>
  <CustomFooter></CustomFooter>
</template>

<script>
import CustomHeader from "@/components/Header.vue"
import CustomFooter from "@/components/Footer.vue"
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    CustomHeader,
    CustomFooter,
    Navbar
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
