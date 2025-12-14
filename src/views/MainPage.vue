<template>
  <Navbar></Navbar>
  <button class="Btn red" @click="logOut">Logout</button>
  <Posts></Posts>
  <button class="Btn green" @click="addPost">Add post</button>
  <button class="Btn red" @click="deleteAll">Delete all</button>
</template>


<script>
import CustomHeader from "@/components/Header.vue"
import CustomFooter from "@/components/Footer.vue"
import Posts from "@/components/Posts.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "MainPage",
  components: {
    CustomHeader,
    CustomFooter,
    Posts,
    Navbar
  },
  methods: {
    addPost() {
      this.$router.push("/addpost");
    },

    deleteAll() {
      this.$store.dispatch("deleteAll");
    },

    async logOut() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  
  }
}
</script>

<style>
.Btn {
  margin: 10px 5px;
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.red {
  background-color: #c52115;
}

.green {
  background-color: #3b8132;
}
</style>