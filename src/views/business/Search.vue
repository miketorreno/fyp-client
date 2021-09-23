<template>
  <div class="pa-2 review">
    <v-row>
      <v-col cols="12" md="10">
        <!-- <h2 class="mt-4">Results (32)</h2> -->
      </v-col>
      <v-col class="" cols="12" md="10">
        <!-- <h3 class="mb-3">See the business you’d like to review?</h3> -->
        <v-row>
          <v-col cols="12" md="10">
            <v-card
              v-for="b in result"
              :key="b.__id"
              class="mx-auto mb-4"
              outlineds
              :to="{ path: `/business/${b.__id}` }"
            >
              <v-list-item v-if="b.category.id == business" three-line>
                <v-list-item-avatar tile size="90" color="grey">
                  <v-img :src="b.header_image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ b.business_name }}
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
                    <p>{{ b.address }}</p>
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
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "Search",
  data: () => ({
    result: null,
    business: "",
    location: "",
  }),
  watch: {
    "$route.params.business": function() {
      this.search();
    },
    "$route.params.location": function() {
      this.search();
    },
  },
  created() {
    this.search();
    /* (this.business = this.$route.params.business),
      (this.location = this.$route.params.location),
      axios({
        url: "/graphql",
        method: "post",
        data: {
          query: `
          query {
            businessSearch(search: "${this.$route.params.location}") {
              __id
              business_name
              category {
                id
              }
            }
          }
        `,
        },
      }).then((result) => {
        this.result = result.data.data.businessSearch;
      }); */
  },
  methods: {
    search() {
      (this.business = this.$route.params.business),
        (this.location = this.$route.params.location),
        axios({
          url: "/graphql",
          method: "post",
          data: {
            query: `
            query {
              businessSearch(search: "${this.$route.params.location}") {
                __id
                business_name
                address
                header_image
                category {
                  id
                }
              }
            }
          `,
          },
        }).then((result) => {
          this.result = result.data.data.businessSearch;
          // console.log(this.result);
        });
    },
  },
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
