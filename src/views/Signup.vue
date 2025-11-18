<template>
  <div class="signup-container">
    <form class="signup-form" @submit.prevent="handleSignup">
      <h2>Sign Up</h2>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="Email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="Password"
          @input="validatePassword"
          required
        />
      </div>

      <div v-if="!isPasswordValid && password.length > 0" class="error-message">
        <p>The password is not valid:</p>
        <ul>
          <li v-for="error in passwordErrors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <button type="submit" class="signup-btn" :disabled="!isPasswordValid || !email">
        Signup
      </button>
    </form>
  </div>
</template>


<script>
import CustomHeader from "@/components/Header.vue"
import CustomFooter from "@/components/Footer.vue"

export default {
  name: 'Signup',
  components: {
    CustomHeader,
    CustomFooter
  },
  data() {
    return {
      email: '',
      password: '',
      passwordErrors: [],
      isPasswordValid: false
    }
  },
  methods: {
    validatePassword() {
      this.passwordErrors = [];

      // Length
      if (this.password.length < 8 || this.password.length >= 15) {
        this.passwordErrors.push('The password should be at least 8 characters and less than 15 characters');
      }

      // Start with uppercase
      if (!/^[A-Z]/.test(this.password)) {
        this.passwordErrors.push('It should start with an uppercase alphabet');
      }

      // One uppercase
      if (!/[A-Z]/.test(this.password)) {
        this.passwordErrors.push('Includes at least one uppercase alphabet character');
      }

      // Two lowercase
      const lowercaseMatches = this.password.match(/[a-z]/g);
      if (!lowercaseMatches || lowercaseMatches.length < 2) {
        this.passwordErrors.push('Includes at least two lowercase alphabet characters');
      }

      // One numeric value
      if (!/\d/.test(this.password)) {
        this.passwordErrors.push('Includes at least one numeric value');
      }

      // Underscore
      if (!this.password.includes('_')) {
        this.passwordErrors.push('It should include the character "_"');
      }

      this.isPasswordValid = this.passwordErrors.length === 0;
    },
    handleSignup() {
      if (this.isPasswordValid && this.email) {
        console.log('Signup successful!', {
          email: this.email,
          password: this.password
        });
        alert('Signup successful!');
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
  background-color: #e8e8e8;
}

.signup-form {
  background-color: #f5f5dc;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.signup-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.error-message {
  background-color: #ffe6e6;
  border: 1px solid #ff0000;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}

.error-message p {
  margin: 0 0 5px 0;
  color: #d00;
  font-weight: bold;
}

.error-message ul {
  margin: 5px 0 0 20px;
  padding: 0;
  color: #d00;
}

.error-message li {
  margin-bottom: 3px;
}

.signup-btn {
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

.signup-btn:hover:not(:disabled) {
  background-color: #6892c3;
}

.signup-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .signup-form {
    padding: 20px;
  }
}
</style>