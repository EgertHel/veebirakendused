<template>
  <footer>
    <nav class="footer-nav">
      <a href="#">About</a>
      <a href="#">Contact</a>
      <a href="#">FAQ</a>
    </nav>
    <p>© 2025 All rights reserved</p>
  </footer>
</template>

<script>
export default {
  name: 'CustomFooter'
}
</script>

<style>
footer {
  text-align: center;
  padding: 1.5rem;
}

.footer-nav {
  display: inline-flex;
  gap: 1.5rem;
}

.footer-nav a {
  text-decoration: none;
  color: #2c3e50;
}

.footer-nav a:hover {
  opacity: 0.8;
}
</style>