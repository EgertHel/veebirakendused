<template>
  <div class="page-container">
    <div class="form-container">
      <div class="form-content">
        <div class="form-group">
          <label>Email</label>
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              @keyup.enter="handleLogin"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
              type="password"
              v-model="password"
              placeholder="Password"
              @keyup.enter="handleLogin"
          />
        </div>

        <div class="button-group">
          <button @click="handleLogin" class="action-btn">Login</button>
          <span class="or-text">Or</span>
          <button @click="goToSignup" class="action-btn">Signup</button>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '';

      if (!this.email || !this.password) {
        this.errorMessage = 'Please provide both email and password';
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
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
          this.errorMessage = errorData.error || 'Login failed';
        }
      } catch (error) {
        this.errorMessage = 'Network error occurred';
        console.error('Login error:', error);
      }
    },
    goToSignup() {
      this.$router.push('/signup');
    }
  }
};
</script>

<style scoped>
.page-container {
  max-width: 500px;
  margin: 0px auto;
}

.nav-bar {
  background-color: #b8b8b8;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;
}

.nav-bar a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  margin: 0 10px;
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
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

.button-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  background-color: #64b5f6;
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

.action-btn:hover {
  background-color: #42a5f5;
}

.or-text {
  font-weight: bold;
  color: #666;
}

.error {
  color: #d32f2f;
  margin-top: 15px;
  font-size: 14px;
}
</style>