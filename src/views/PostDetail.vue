<template>
    <div v-if="loading" class="post">
      <p>Loading post...</p>
    </div>

    <div v-else-if="error" class="post">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else-if="!post" class="post">
      <h2>This post doesn't exist</h2>
    </div>

    <div v-else class="addPost-container">
        <form class="addPost-form" @submit.prevent="updatePost">
            <h3>Post #{{ post.id }}</h3>

            <div class="input-container">
                <label for="input-body">Body</label>
                <textarea id="input-body" v-model="body" required></textarea>
            </div>

            <div class="btn-container">
                <button class="submit-btn" type="submit">Update</button>
                <button class="submit-btn" type="button" @click="deletePost">Delete</button>
            </div>
        </form>
    </div>
</template>


<script>
export default {
  name: "PostDetail",

  async mounted() {
    const postId = this.$route.params.id

    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
        
        if (response.status == 404) {
            console.log("Post does not exist")
            return
        }

        else if (!response.ok) {
            throw new Error("Failed to fetch post")
        }

        const data = await response.json()
        this.post = data
        this.body = this.post.body
    } catch (err) {
        console.error(err.message)
        this.error = err.message
    } finally {
        this.loading = false
    }
  },

  methods: {
    async updatePost() {
        const postId = this.$route.params.id
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {body: this.body} )
            })

            if (!response.ok) {
                throw new Error("Failed to update the post")
            }

            this.$router.push("/")
        } catch (err) {
            console.error(err)
        }
    },

    async deletePost() {
        const postId = this.$route.params.id
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error("Failed to delete the post")
            }

            this.$router.push("/")
        } catch (err) {
            console.error(err)
        }
    }
  },
  
  data() {
      return {
        post: null,
        body: "",
        loading: true,
        error: null,
      };
  }
}
</script>

<style>
.btn-container {
    display: flex;
    gap: 10px;
}
</style>