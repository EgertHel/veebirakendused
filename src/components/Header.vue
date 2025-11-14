<template>
    <header>
        <h1>Header</h1>
        <nav>
            <ul>
                <li ><router-link to="/">Main page</router-link></li>
                <li ><router-link to="/Signup">Signup</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'CustomHeader'
}
</script>