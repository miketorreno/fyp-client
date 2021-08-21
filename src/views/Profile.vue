<template>
  <div class="profile">
    <h1>Profile</h1>
    <h4>
      Name: <span>{{ name }}</span>
    </h4>
    <h4>
      Email: <span>{{ email }}</span>
    </h4>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "Profile",
  data: () => ({
    loading: true,
    errors: null,
    name: "",
    email: "",
  }),
  created() {
    axios
      .get("/api/user")
      .then((response) => {
        if (response.status && response.status == 200) {
          this.name = response.data.name;
          this.email = response.data.email;
        }
      })
      .catch((errors) => {
        if (errors.response.status == 401) {
          localStorage.removeItem("fyptoken");
          this.$router.push({ name: "Login" });
        }
        if (errors.response.data.exception) {
          this.exception = errors.response.data.message;
        }
        this.errors = errors.response.data.errors;
        console.log(errors, this.exception, this.errors);
      })
      .finally(() => (this.loading = false));
  },
};
</script>
