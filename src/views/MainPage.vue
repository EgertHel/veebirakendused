<template>
  <Posts></Posts>
  <button id="resetBtn" @click="resetAllLikes">Reset All Likes</button>
</template>


<script>
import CustomHeader from "@/components/Header.vue"
import CustomFooter from "@/components/Footer.vue"
import Posts from "@/components/Posts.vue";

export default {
  name: "MainPage",
  components: {
    CustomHeader,
    CustomFooter,
    Posts
  },
  methods: {
    resetAllLikes() {
      this.$store.dispatch("resetAllLikes");
    }
  
  }
}
</script>

<style>
#resetBtn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #c52115;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>