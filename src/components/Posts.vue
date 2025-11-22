<script>
import { mapState, mapActions } from "vuex";
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
    likePost(postId) {
      this.$store.commit("INCREMENT_LIKES", postId);
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
    
    <section v-else v-for="post in posts" :key="post.id" class="post">
      
      <header class="postHeader">
        <a class="logo" href="#">
          <img :src="profileImage" alt="Profile">
        </a>
        <p>{{ post.date }}</p>
      </header>
      
      <img v-if="post.imagePath" 
           class="postImage" 
           :src="post.imagePath" 
           alt="Post image"
      />
      
      <p class="postText">{{ post.content }}</p>
      
      <footer class="postFooter">
        <i class="fa-solid fa-thumbs-up like"
        @click="likePost(post.id)" ></i>
        <span class="like-count"> {{ post.likes }} likes</span>
      </footer>

    </section>
  </div>
</template>

<style>
#timeline {
  padding: 0% 5%;
  width: 80%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
}

.post {
  width: 100%;
  background-color: #f1f3f3;
  margin-bottom: 1%;
  border-radius: .5em;
  padding: 0.8% 1%;
  border: 2px solid #d9d9d9;
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

.postFooter {
  height: 25px;
  display: flex;
  justify-items: left;
}

.like {
  color: #a3a3a3;
  cursor: pointer;
  margin-right: 5px;
}

.like:hover {
  color: #4267B2;
}
</style>
