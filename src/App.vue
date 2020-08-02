<template>
  <div id="app">
    <nav
      class="navbar navbar-light"
      style="background-color:#d5d8dc ; height: 60px"
    >
      <h4 class="my-auto">Kev's Stock Info</h4>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.price-key,
.financial-key {
  font-weight: bold;
}
</style>
