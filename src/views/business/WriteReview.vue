<template>
  <div class="pa-2 review">
    <v-row>
      <v-col cols="12" md="8">
        <h2 class="mt-4">Genet Pharmacy</h2>
        <v-form class="mb-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="10">
                <v-rating
                  background-color="amber lighten-3"
                  color="amber"
                ></v-rating>

                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  placeholder="Share details of your own experience at this place"
                  rows="4"
                ></v-textarea>

                <div class="text-right">
                  <v-btn color="" class="mr-4">
                    Cancel
                  </v-btn>

                  <v-btn color="primary">
                    Submit
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
