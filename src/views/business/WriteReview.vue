<template>
  <div class="pa-2 review">
    <ApolloQuery
      :query="require('@/graphql/queries/business/Business.gql')"
      :variables="{ id: id }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occurred</div>
        <div v-else-if="data" class="result apollo">
          <v-row>
            <v-col cols="12" md="8">
              <h2 class="mt-4">{{ data.business.business_name }}</h2>
              <v-form ref="review" v-model="valid" lazy-validation class="mb-6">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="10">
                      <v-rating
                        v-model="rating"
                        background-color="amber lighten-3"
                        color="amber"
                      ></v-rating>

                      <v-textarea
                        v-model="review"
                        clearable
                        clear-icon="mdi-close-circle"
                        placeholder="Share details of your own experience at this place"
                        rows="4"
                      ></v-textarea>

                      <input
                        type="hidden"
                        :value="data.business.id"
                        ref="business"
                      />

                      <div class="text-right">
                        <v-btn color="" class="mr-4" @click="reset">
                          Cancel
                        </v-btn>

                        <v-btn
                          :disabled="!valid"
                          @click="validate"
                          color="primary"
                        >
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

        <!-- No result -->
        <!-- <div v-else class="no-result apollo">No result :(</div> -->
      </template>
    </ApolloQuery>
    <!-- <v-row>
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
    </v-row> -->
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  data() {
    return {
      id: this.$route.params.id,
      valid: true,
      rating: 0,
      review: "",
      userId: null,
    };
  },
  methods: {
    reset() {
      this.rating = 0;
      this.$refs.review.reset();
    },
    validate() {
      if (this.$refs.review.validate()) {
        if (localStorage.getItem("fyptoken")) {
          axios
            .get("/api/user")
            .then((response) => {
              if (response.status && response.status == 200) {
                this.userId = response.data.id;
                this.submitReview();
              }
            })
            .catch((errors) => {
              if (errors.response.status == 401) {
                localStorage.removeItem("fyptoken");
                this.$router.push({ name: "Login" });
              }
              if (errors.response.data.exception) {
                // this.exception = errors.response.data.message;
                console.log(errors.response.data.message);
              }
              // this.errors = errors.response.data.errors;
              console.log(errors.response.data.errors);
            });
        } else {
          this.$router.push({ name: "Login" });
        }
        // console.log(this.$refs.business.value, this.rating, this.review);
      }
    },
    submitReview() {
      axios({
        url: "/graphql",
        method: "post",
        data: {
          query: `
            mutation createReview($businessId: Int!, $userId: Int!, $rating: Int!, $review: String!) {
              createReview(business_id: $businessId, user_id: $userId, rating: $rating, review: $review) {
                id
                __id
                rating
                review
              }
            }
          `,
          variables: {
            businessId: parseInt(this.$refs.business.value),
            userId: parseInt(this.userId),
            rating: parseInt(this.rating),
            review: this.review,
          },
        },
      }).then((result) => {
        console.log(result.data);
        // this.$router.push({ name: "Business", params: { id: `${this.id}` } });
        this.$router.go();
      });
    },
  },
  // data: () => ({
  // id: this.$route.params.id,
  // categoryValue: null,
  // placeValue: null,
  // searchCategories: ["category 1", "category 2", "category 3", "category 4"],
  // searchPlaces: [
  //   "Current Location",
  //   "place 1",
  //   "place 2",
  //   "place 3",
  //   "place 4",
  // ],
  // }),
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
