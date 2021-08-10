<template>
  <div>
    <v-app-bar app flat dense>
      <v-container>
        <v-toolbar-title>Bizz</v-toolbar-title>
        <!-- <v-spacer class="d-none d-md-flex"></v-spacer> -->
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  data: () => ({}),
};
</script>
