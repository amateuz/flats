<template>
  <div id="app">
    <div class="container">
      <FlatCard :flat="fl" v-for="(fl, i) in flats" :key="i" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FlatCard from "@/components/FlatCard";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    FlatCard,
  },
  computed: {
    ...mapGetters(["getLikedFlats"]),
  },
  data() {
    return {
      flats: [],
    };
  },
  watch: {
    getLikedFlats(newLikedFlats) {
      localStorage.setItem("likedFlats", JSON.stringify(newLikedFlats));
    },
  },
  created() {
    if (localStorage.getItem("likedFlats") !== null) {
      let loadedLikedFlats = [];
      try {
        loadedLikedFlats = JSON.parse(localStorage.getItem("likedFlats"));
      } catch {
        loadedLikedFlats = [];
      }
      this.$store.dispatch("setLikedFlats", loadedLikedFlats);
    }
  },
  mounted() {
    axios
      .get("entities.json")
      .then((res) => (this.flats = res.data.response))
      .catch((err) => {
        this.flats = [];
        console.log(err);
      });
  },
};
</script>

<style lang="less">
html,
body {
  box-sizing: border-box;
  margin: 0;
  overflow-x: hidden;
  padding: 0;
}
body {
  background-color: #efefef;
  position: relative;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
}
</style>
