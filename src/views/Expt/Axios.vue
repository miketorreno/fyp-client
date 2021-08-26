<template>
  <div class="axios">
    <h1>Axios</h1>
    <div>
      <h3>Categories</h3>
      <ul>
        <li v-for="c in categories.data" :key="c.__id">
          {{ c.category }}
          <div v-if="c.businesses.length">
            <ul>
              <li v-for="b in c.businesses" :key="b.__id">
                {{ b.business_name }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
      <p>
        {{ categories.paginatorInfo }}
      </p>
      <!-- <p>Current Page: {{ categories.paginatorInfo["currentPage"] }}</p>
      <p>Last Page: {{ categories.paginatorInfo["lastPage"] }}</p>
      <p>Has More Pages: {{ categories.paginatorInfo["hasMorePages"] }}</p>
      <p>Total: {{ categories.paginatorInfo["total"] }}</p> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "Axios",

  components: {},

  created() {
    axios({
      url: "/graphql",
      method: "post",
      data: {
        query: `
          query {
            categories(page: 1) {
              paginatorInfo {
                currentPage
                lastPage
                hasMorePages
                lastPage
                total
              }
              data {
                id
                parent_id
                __id
                category
                businesses {
                  id
                  __id
                  business_name
                }
              }
            }
          }
        `,
      },
    }).then((response) => {
      console.log(response.data.data.categories);
      this.categories = response.data.data.categories;
    });

    /*     const data = await axios.post(API_URL, {
      query: `mutation updateUserCity($id: Int!, $city: String!) {
        updateUserCity(userID: $id, city: $city){
          id
          name
          age
          city
          knowledge{
            language
            frameworks
          }
        }
      }`,
      variables: {
        id: 2,
        city: 'Test'
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) */
  },

  data: () => ({
    categories: [],
  }),

  methods: {},
};
</script>
