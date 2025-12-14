<template>
    <div class="nav-bar">
        <router-link to="/">Home</router-link> |
        <router-link to="/contacts">Contacts</router-link>
    </div>
</template>

<script>
</script>

<style>
.nav-bar {
    background-color: #b8b8b8;
    padding: 15px 0px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 8px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.nav-bar a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
    margin: 0 10px;
}
</style>