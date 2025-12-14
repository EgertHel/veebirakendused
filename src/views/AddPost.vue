<template>
    <div class="addPost-container">
        <form class="addPost-form" @submit.prevent="submitPost">
            <h3>Add Post</h3>

            <div class="input-container">
                <label for="input-body">Body</label>
                <textarea id="input-body" type="text" placeholder="body" v-model="body" required></textarea>
            </div>

            <button class="submit-btn" type="submit">Add</button>
        </form>
    </div>
</template>

<style>
.addPost-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: 20px;
}

.addPost-form {
    background-color: #f5f5dc;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.input-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

#input-body {
  width: 100%;
  height: 10rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #7da3d4;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>

<script>
export default {
    name: "AddPost",
    data() {
        return {
            body: ""
        }
    },
    methods: {
        async submitPost() {
            try {
                const response = await fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify( {body: this.body} )
                })
            
                if (!response.ok) {
                    throw new Error("Failed to submit the post")
                }

                this.body = ""
                this.$router.push("/")
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>