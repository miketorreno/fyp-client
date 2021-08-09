<template>
  <v-app>
    <v-card class="mx-auto" tile>
      <v-navigation-drawer v-model="drawer" app>
        <div class="d-flex d-md-none">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="@/assets/img/john.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  John Leider
                </v-list-item-title>
                <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <v-list class="d-none d-md-flex">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6 text-center">
                Bizz
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action> </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list outlined>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-app-bar app flat dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-text-field
        hide-details
        light
        solo
        rounded
        dense
        prepend-inner-icon="mdi-search-web"
        flat
        single-line
        placeholder="Search here"
      ></v-text-field>

      <v-spacer class="d-none d-md-flex"></v-spacer>
      <v-avatar size="42">
        <img src="@/assets/img/john.jpg" alt="John" />
      </v-avatar>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-sheet color="white" elevation="1">
        <v-chip class="ma-2" outlined>
          <v-icon left>
            mdi-silverware-fork-knife
          </v-icon>
          Restaurants
        </v-chip>

        <v-chip class="ma-2" outlined>
          <v-icon left>
            mdi-gas-station
          </v-icon>
          Gas
        </v-chip>

        <v-chip class="ma-2" outlined>
          <v-icon left>
            mdi-cart
          </v-icon>
          Groceries
        </v-chip>

        <v-chip class="ma-2" outlined>
          <v-icon left>
            mdi-bed
          </v-icon>
          Hotels
        </v-chip>
      </v-sheet>

      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    selectedItem: null,
    items: [
      { text: "My Files", icon: "mdi-folder" },
      { text: "Shared with me", icon: "mdi-account-multiple" },
      { text: "Starred", icon: "mdi-star" },
      { text: "Recent", icon: "mdi-history" },
      { text: "Offline", icon: "mdi-check-circle" },
      { text: "Uploads", icon: "mdi-upload" },
      { text: "Backups", icon: "mdi-cloud-upload" },
    ],
  }),
};
</script>
