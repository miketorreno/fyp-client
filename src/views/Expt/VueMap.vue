<template>
  <div class="vuemap">
    <div class="mr-4" style="float: left;">
      <h1>Your Coordinates</h1>
      <h4>
        {{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude,
      </h4>
    </div>
    <div>
      <h1>Map Coordinates</h1>
      <h4>
        {{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude,
      </h4>
    </div>
    <GmapMap
      :center="myCoordinates"
      :zoom="zoom"
      style="width: 750px; height: 450px"
      ref="mapRef"
      @dragend="handleDrag"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
  name: "VueMap",
  components: {},
  data: () => ({
    map: null,
    myCoordinates: {
      lat: 0,
      lng: 0,
    },
    zoom: 15,
  }),
  created() {
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates;
        })
        .catch((error) => alert(error));
    }

    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    handleDrag() {
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },
  },
  computed: {
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
.vuemap- {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
