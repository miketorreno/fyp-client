<template>
  <div class="signup" align="center" justify="center">
    <v-card class="px-4" max-width="600px" min-width="360px">
      <v-card-title>Create Account</v-card-title>

      <v-card-text>
        <v-form ref="registerForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                label="Name"
                maxlength="20"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                block
                v-model="verify"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, passwordMatch]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
              <v-btn block :disabled="!valid" color="primary" @click="validate"
                >Create</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import gql from "graphql-tag";
// import nanoid from "nanoid";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "Register",
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    register() {
      this.loading = true;
      axios.get("/sanctum/csrf-cookie").then((response) => {
        console.log(response);
        axios
          .post("/register", {
            __id: this.nid,
            name: this.name,
            avatar: this.avatar,
            email: this.email,
            password: this.password,
            password_confirmation: this.verify,
          })
          .then((response) => {
            if (response.status && response.status == 201) {
              this.$router.push({
                name: "Home",
              });
            }
          })
          .catch((error) => {
            if (error.response.data.exception) {
              this.exception = error.response.data.message;
            }
            this.errors = error.response.data.errors;
            console.log(error, this.exception, this.errors);
          })
          .finally(() => (this.loading = false)); // credentials didn't match
      });
    },
    validate() {
      if (this.$refs.registerForm.validate()) {
        // submit form to server/API here...
        this.register();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: true,
    loading: false,
    errors: "",
    avatar: "user.jpg",

    name: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
};
</script>
