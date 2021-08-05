import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as fasThumbsUp,
  faMapMarkedAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(farThumbsUp, fasThumbsUp, faMapMarkedAlt, faUser);

Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
