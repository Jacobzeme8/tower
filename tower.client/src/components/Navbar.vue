<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
  <nav class="navbar navbar-expand navbar-dark color-scheme px-3 d-flex">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 class=" lobster color-scheme" title="Tower Home Page">The Tower</h1>
      </div>
    </router-link>
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <!-- <div class="collapse navbar-collapse" id="navbarText"> -->
    <ul class="navbar-nav me-auto">
      <li>
        <Login />
      </li>
      <button v-if="account.id" class="color-scheme-reverse m-auto btn border-warning mx-2" data-bs-toggle="modal"
        data-bs-target="#eventModal">Create
        Event</button>
      <li>
      </li>
    </ul>
    <!-- LOGIN COMPONENT HERE -->
    <!-- </div> -->
  </nav>
  <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <EventFormModal />
  </div>
</template>

<script>
import Login from './Login.vue'
import { computed } from "vue";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.lobster {
  font-family: 'lobster';
}

.nav-link {
  text-transform: uppercase;
}



.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
