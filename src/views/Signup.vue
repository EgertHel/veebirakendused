<template>
  <div class="page-container">
    <Navbar></Navbar>
    <div class="form-container">
      <div class="form-content">
        <div class="form-group">
          <label>Email</label>
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              @keyup.enter="handleSignup"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
              type="password"
              v-model="password"
              placeholder="Password"
              @keyup.enter="handleSignup"
          />
        </div>

        <button @click="handleSignup" class="action-btn">Signup</button>

        <div v-if="errorMessages.length > 0" class="error-container">
          <ul class="error-list">
            <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Signup',
  components: {
    Navbar
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessages: []
    };
  },
  methods: {
    async handleSignup() {
      this.errorMessages = [];

      if (!this.email || !this.password) {
        this.errorMessages = ['Please provide both email and password'];
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Important for cookies
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          this.$store.commit('SET_USER', {
            id: data.user_id,
            email: this.email
          });
          await this.$router.push('/');
        } else {
          const errorData = await response.json();
          if (errorData.errors) {
            this.errorMessages = errorData.errors;
          } else if (errorData.error) {
            this.errorMessages = [errorData.error];
          } else {
            this.errorMessages = ['Signup failed'];
          }
        }
      } catch (error) {
        this.errorMessages = ['Network error occurred'];
        console.error('Signup error:', error);
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  max-width: 500px;
  margin: 0px auto;
}

.form-container {
  background-color: #b8b8b8;
  padding: 30px;
  border-radius: 8px;
}

.form-content {
  background-color: #e8f5e9;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  width: 100px;
  font-weight: bold;
  text-align: left;
}

.form-group input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.action-btn {
  background-color: #64b5f6;
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.action-btn:hover {
  background-color: #42a5f5;
}

.error-container {
  margin-top: 15px;
  width: 100%;
}

.error-list {
  color: #d32f2f;
  font-size: 14px;
  list-style-position: inside;
  padding-left: 0;
  text-align: left;
}

.error-list li {
  margin-bottom: 5px;
}
</style>