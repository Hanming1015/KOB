<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default{
  components: {
    NavBar
  },
  // setup() {
  //   // $.ajax({
  //   //   url: "http://localhost:3000/user/account/info/",
  //   //   type: "GET",
  //   //   headers: {
  //   //     Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0ZjRhOGY1MmQ1MWY0NzE0ODU3NDBiYzliNjIwMTEzMyIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTc3MjA1Mjk2MCwiZXhwIjoxNzczMjYyNTYwfQ.Wn5Mu4RNl_pUWMRDJzbBn3WnZf_RN6thOaS_WHG5HKg"
  //   //   },
  //   //   success(resp) {
  //   //     console.log("Info:", resp);
  //   //   },
  //   //   error(resp) {
  //   //     console.log("Error:", resp);
  //   //   },
  //   // });

  //   // $.ajax({
  //   //   url: "http://localhost:3000/user/account/register/",
  //   //   type: "POST",
  //   //   data: {
  //   //     username: "admin1",
  //   //     password: "123",
  //   //     confirmedPassword: "123",
  //   //   },
  //   //   success(resp) {
  //   //     console.log("Register:", resp);
  //   //   },
  //   //   error(resp) {
  //   //     console.log("Error:", resp);
  //   //   },
  //   // });
  // }
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
