import { createStore } from "vuex"

export default createStore({
  state: {
    posts: [],
    loading: false,
    error: null
  },
  getters: {
  },
  mutations: {
    SET_POSTS(state, fetchedPosts) {
      state.posts = fetchedPosts.map(post => ({
        // To copy all existing properties from the API data into the new post object.
        ...post,
        // Add or overwrite a "likes" property initialized to 0
        likes: post.likes || 0
      }));
    },

    SET_LOADING(state, status) {
      state.loading = status;
    },

    SET_ERROR(state, message) {
      state.error = message;
    },

    INCREMENT_LIKES(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
      }
    },

    RESET_ALL_LIKES(state) {
      state.posts.forEach(post => {
        post.likes = 0;
      });
    }

  },
  actions: {
    async fetchPosts({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await fetch("https://690285dab208b24affe66246.mockapi.io/api/v1/posts");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        // Update the state with fetched data
        commit("SET_POSTS", json);
        console.log("Posts fetched and saved to store.");

      } catch (err) {
        console.error("Fetch Error:", err);
        // Set the error state
        commit("SET_ERROR", `Failed to load posts: ${err.message}`);

      } finally {
        // Clear loading state
        commit("SET_LOADING", false);
      }
    },

    incrementLikes({ commit }, postId) {
      commit("INCREMENT_LIKES", postId);
    },

    resetAllLikes({ commit }) {
      commit("RESET_ALL_LIKES");
    }
  },
  modules: {
  }
})
