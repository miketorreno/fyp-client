<template>
  <div class="home">
    <h3 class="ma-2 mt-5">Popular</h3>
    <div class="horizontal-scroll">
      <v-card
        v-for="i in 5"
        :key="i"
        :loading="loading"
        class="ma-3"
        max-width="300"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="150" src="@/assets/img/cooking.png"></v-img>

        <v-card-title>Cafe Badilico</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">
              4.5 (413)
            </div>
          </v-row>

          <div class="mt-4 text-subtitle-1">
            607 West Lake St, Uptown
          </div>

          <div class="text-subtitle-1">
            $ • Italian, Cafe • 1.8mi
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
      </v-card>
    </div>

    <h3 class="ma-2 mt-5">Other</h3>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-betweens">
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>

            <div>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-actions>
                <v-btn
                  v-if="item.artist === 'Ellie Goulding'"
                  class="ml-2 mt-3"
                  fab
                  icon
                  height="40px"
                  right
                  width="40px"
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn v-else class="ml-2 mt-5" outlined rounded small>
                  START RADIO
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <h3 class="ma-2 mt-5">Near by</h3>
    <div class="horizontal-scroll">
      <v-card
        v-for="i in 7"
        :key="i"
        :loading="loading"
        class="ma-3"
        max-width="500"
      >
        <div class="d-flex flex-no-wrap justify-space-betweens">
          <v-avatar class="ma-3" size="125" tile>
            <v-img src="@/assets/img/foster.jpg"></v-img>
          </v-avatar>

          <div>
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <!-- <v-img height="150" src="@/assets/img/cooking.png"></v-img> -->

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="mt-4 text-subtitle-1">
                607 West Lake St, Uptown
              </div>

              <div class="text-subtitle-1">
                $ • Italian, Cafe
              </div>
            </v-card-text>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    items: [
      {
        color: "#1F7087",
        src: "@/assets/img/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "@/assets/img/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
  }),
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style>
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
}
/* .horizontal-scroll::-webkit-scrollbar {
  display: none;
}
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
} */
</style>
