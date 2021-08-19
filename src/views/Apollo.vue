<template>
  <div class="apollo">
    <h1>Apollo</h1>
    <div v-if="user != null">
      {{ user.name }}
      <br />
      {{ user }}
    </div>
    <br /><br />

    <v-btn @click="addUser()">ADD</v-btn>

    <br /><br />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Apollo",

  components: {},

  data: () => ({}),

  apollo: {
    user: gql`
      query {
        user(id: 1) {
          id
          email
          name
        }
      }
    `,
  },

  methods: {
    async addUser() {
      // Call to the graphql mutation
      const result = await this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation($name: String!, $email: String!, $password: String!) {
            createUser(name: $name, email: $email, password: $password) {
              id
              email
              name
            }
          }
        `,
        // Parameters
        variables: {
          name: "Second User",
          email: "newuser12@newuser.com",
          password: "blablabla",
        },
      });

      return result;
    },
  },
};
</script>
