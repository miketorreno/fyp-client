<template>
  <div class="vuelaravelmap">
    <h1>Businesses</h1>
    <div class="mr-6" style="float: left;">
      <h3>Your Coordinates</h3>
      <h4>
        {{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude
      </h4>
    </div>
    <div>
      <h3>Map Coordinates</h3>
      <h4>
        {{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude
      </h4>
    </div>
    <GmapMap
      :center="mapCenter"
      :zoom="zoom"
      style="width: 1000px; height: 600px"
      ref="mapRef"
      @dragend="handleDrag"
    >
      <GmapInfoWindow
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="handleInfoWindowClose"
      >
        <div class="info-window">
          <h2 v-text="activeBusiness.business_name"></h2>
          <h3 v-text="activeBusiness.address"></h3>
          <p v-text="activeBusiness.city">1234 Test Drive</p>
        </div>
      </GmapInfoWindow>
      <GmapMarker :position="getMyPosition(myCoordinates)" :icon="icon" />

      <GmapMarker
        :key="index"
        v-for="(b, index) in businesses.data"
        :position="getPosition(b)"
        :clickable="true"
        :draggable="false"
        @click="handleMarkerClick(b)"
      />
    </GmapMap>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "VueLaravelMap",
  components: {},
  data: () => ({
    map: null,
    myCoordinates: {
      lat: 0,
      lng: 0,
    },
    iconColor: "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png",
    icon: {
      url: "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png",
      scaledSize: { width: 28, height: 28 },
      // labelOrigin: { x: 16, y: -10 },
    },
    zoom: 15,
    businesses: [],
    activeBusiness: {},
    infoWindowOpened: false,
    infoWindowOptions: {
      pixelOffset: {
        width: 0,
        height: -35,
      },
    },
  }),
  created() {
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      this.$getLocation({})
        .then((coordinates) => {
          coordinates.lat.toFixed(7);
          coordinates.lng.toFixed(7);
          this.myCoordinates = coordinates;
          console.log(coordinates);
        })
        .catch((error) => alert(error));
    }

    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }

    axios({
      url: "/graphql",
      method: "post",
      data: {
        query: `
          query {
          	businesses(page: 1) {
              paginatorInfo {
                total
                currentPage
                lastPage
                hasMorePages
              }
              data {
                id
                __id
                business_name
                address
                city
                latitude
                longitude
                category {
                  id
                  category
                }
              }
            }
          }
        `,
      },
    }).then((response) => {
      this.businesses = response.data.data.businesses;
      console.log(this.businesses);
    });
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    getPosition(b) {
      return {
        lat: parseFloat(b.latitude),
        lng: parseFloat(b.longitude),
      };
    },
    getMyPosition(coords) {
      return {
        lat: parseFloat(coords.lat),
        lng: parseFloat(coords.lng),
      };
    },
    handleMarkerClick(b) {
      this.activeBusiness = b;
      this.infoWindowOpened = true;
    },
    handleInfoWindowClose() {
      this.activeBusiness = [];
      this.infoWindowOpened = false;
    },
    handleDrag() {
      let center = {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(7),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(7),
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },
  },
  computed: {
    mapCenter() {
      if (!this.businesses.data) {
        return {
          lat: 10,
          lng: 10,
        };
      }

      /* For each of the businesses available:
          Calculate center point for all of them
          Calculate median point for all of them
          Get bounding box and zoom level based on laragest/smallest values...
      */

      return {
        lat: parseFloat(this.businesses.data[0].latitude),
        lng: parseFloat(this.businesses.data[0].longitude),
      };
    },

    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeBusiness.latitude),
        lng: parseFloat(this.activeBusiness.longitude),
      };
    },

    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }

      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(7),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(7),
      };
    },
  },
};
</script>

<style>
.vuelaravelmap- {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
