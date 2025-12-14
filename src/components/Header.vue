<template>
    <header>
        <div class="center">
            <h1>Web Application Development</h1>
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