<template>
  <div class="pa-2 review">
    <v-row>
      <v-col cols="12" md="10">
        <h2 class="mt-4">Write a review</h2>
        <p class="mb-5 subtitle-1">
          Review your favorite businesses and share your experiences with our
          community.
        </p>
        <v-form class="search" style="width:100%">
          <div class="d-flex">
            <v-autocomplete
              hide-details
              light
              filled
              dense
              prepend-inner-icon="mdi-magnify"
              flat
              single-line
              placeholder="Find"
              clearable
              v-model="categoryValue"
              :items="searchCategories"
              class="mr-1"
            ></v-autocomplete>
            <v-autocomplete
              hide-details
              light
              filled
              dense
              prepend-inner-icon="mdi-map-marker"
              flat
              single-line
              placeholder="Near"
              clearable
              v-model="placeValue"
              :items="searchPlaces"
              class="mr-1"
            ></v-autocomplete>
            <v-btn large tile color="primary" height="40px">
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col class="mt-5" cols="12" md="10">
        <h3 class="mb-3">See the business you’d like to review?</h3>
        <v-row>
          <v-col cols="12" md="10">
            <v-card
              v-for="n in 6"
              :key="n"
              class="mx-auto mb-2"
              outlineds
              :to="{ path: '/business/vuSKPj2ZSTEVMa4SMA6x0/writeareview' }"
            >
              <v-list-item three-line>
                <v-list-item-avatar tile size="90" color="grey">
                  <v-img src="@/assets/img/cooking.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    Genet Pharmacy
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-row class="pa-2">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="22"
                      ></v-rating>

                      <div class="grey--text ms-4 subtitle-1">
                        4.5 (413)
                      </div>
                    </v-row>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <p>A1 Bishoftu, Ethiopia</p>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    categoryValue: null,
    placeValue: null,
    searchCategories: ["category 1", "category 2", "category 3", "category 4"],
    searchPlaces: [
      "Current Location",
      "place 1",
      "place 2",
      "place 3",
      "place 4",
    ],
  }),
};
</script>

<style>
.search .v-text-field,
.search .v-text-field {
  border-radius: 0 !important;
}
.v-application .fs-125 {
  font-size: 1.25rem !important;
}
</style>
