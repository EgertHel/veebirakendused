<script>
import { mapState } from "vuex";
export default {

  // Component name
  name: "Posts",

  // Fetch data when component is created/mounted
  mounted() {
    this.$store.dispatch("fetchPosts"); 
  },

  // Accessing state using mapState
  computed: {
    // Map the Vuex state properties to local computed properties
    // Sates are used, because it is reactive and updates the component when state changes
    ...mapState({
      posts: state => state.posts,
      loading: state => state.loading,
      error: state => state.error,
    }),
  },

  methods: {

    formatDate(date) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date(date))
    },

    navigatePost(postId) {
      this.$router.push(`/post/${postId}`)
    }
  },
  
  // Static image import can be defined in data or handled in the template
  data() {
      return {
          profileImage: "/images/profile.jpg" 
      };
  }
}
</script>

<template>

  <div id="timeline">
    
    <div v-if="loading" class="post">
      <p>Loading posts...</p>
    </div>
    
    <div v-else-if="error" class="post">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else-if="posts.length === 0" class="post">
      <h2>No posts to show</h2>
    </div>
    
    <section v-else v-for="post in posts" :key="post.id" class="post" @click="navigatePost(post.id)">
      
      <header class="postHeader">
        <a class="logo" href="#">
          <img :src="profileImage" alt="Profile">
        </a>
        <p>{{ formatDate(post.date) }}</p>
      </header>
      
      <img v-if="post.imagePath" 
           class="postImage" 
           :src="post.imagePath" 
           alt="Post image"
      />
      
      <p class="postText">{{ post.body }}</p>

    </section>
  </div>
</template>

<style>
#timeline {
  padding: 0% 5%;
  width: 80%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  margin: 0px auto;
}

.post {
  width: 100%;
  background-color: #f1f3f3;
  margin-bottom: 1%;
  border-radius: .5em;
  padding: 0.8% 1%;
  border: 2px solid #d9d9d9;
}

.post:hover {
    cursor: pointer;
}

.postHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo > img {
  margin: 0;
  border-radius: .25em;
  width: 50px;
  height: 50px;
}

.postText {
  margin: 1% 5%;
  text-align: justify;
}

.postImage {
  width: 90%;
  height: auto;
  margin: 1% 5%;
  border-radius: .5em;
}
</style>
