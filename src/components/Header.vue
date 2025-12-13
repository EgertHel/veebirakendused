<template>
    <header>
        <div class="center">
            <h1>Web Application Development</h1>

            <nav class="header-nav">
                <router-link to="/">Main page</router-link>
                <router-link to="/Signup">Signup</router-link>
            </nav>
        </div>

        <div class="profile">
            <router-link to="/Signup">
                <img src="/images/profile.jpg" alt="Profile image"></img>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
  name: 'CustomHeader'
}
</script>

<style>
header {
  position: relative;
  text-align: center;
  padding: 1.5rem;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
}

.header-nav {
  display: inline-flex;
  gap: 1.5rem;
}

.header-nav a {
  padding: 0.5rem 1rem;
  border: 2px solid #2c3e50;
  border-radius: 8px;
  text-decoration: none;
  color: #2c3e50;
}

.header-nav a:hover {
  opacity: 0.8;
}

.profile {
    position: absolute;
    right: 2rem;
    top: 10%;
}

.profile img {
    width: 50px;
    height: 50px;
    border: 1px solid #2c3e50;
    border-radius: 8px;
    cursor: pointer;
}
</style>