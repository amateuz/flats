<template>
  <div class="flat-card">
    <h2 class="flat-card__title">
      {{ flatInfo.title }}
    </h2>
    <div class="flat-card__address">
      <fa-icon icon="map-marked-alt" />
      {{
        `ул. ${flatInfo.address.street}, д.${flatInfo.address.house}, кв.${flatInfo.address.room}`
      }}
    </div>
    <div class="flat-card__agent">
      <fa-icon icon="user" />
      {{ `${agent.last_name} ${agent.first_name} ${agent.middle_name}` }}
    </div>
    <div class="flat-card__rooms">
      <span class="flat-card__rooms-qty">{{ flatInfo.rooms }}</span
      ><!--
      --><span class="flat-card__rooms-text">{{
        `комнат${this.getEnding(flatInfo.rooms)}`
      }}</span>
    </div>
    <button
      class="flat-card__like"
      @click.prevent="toggleFlatLike"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <fa-icon :icon="[`${getIconType}`, 'thumbs-up']" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FlatCard",
  props: {
    flat: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getLikedFlats"]),
    getIconType() {
      if (this.liked) {
        return "fas";
      }
      return "far";
    },
  },
  data() {
    return {
      agent: this.flat.relationships.attributes,
      flatInfo: this.flat.attributes,
      hovered: false,
      liked: false,
    };
  },
  methods: {
    getEnding(number) {
      if (typeof +number !== "number") return "";
      const lastDigit = +number % 10;
      switch (lastDigit) {
        case 0:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          return "";
        case 1:
          return "а";
        case 2:
        case 3:
        case 4:
          return "ы";
      }
    },
    toggleFlatLike() {
      if (this.getLikedFlats.find((f) => f === this.flat.id) === undefined) {
        this.liked = true;
        this.$store.dispatch("setFlatLiked", { id: this.flat.id, liked: true });
      } else {
        this.liked = false;
        this.$store.dispatch("setFlatLiked", {
          id: this.flat.id,
          liked: false,
        });
      }
    },
  },
  created() {
    this.liked = this.getLikedFlats.includes(this.flat.id);
  },
};
</script>

<style scoped lang="less">
.flat-card {
  border: 3px solid var(--primaryColor);
  border-radius: 10px;
  box-shadow: 4px 4px 12px 1px #ccc;
  color: var(--primaryColor);
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  min-width: 250px;
  max-width: 250px;
  height: 280px;
  text-align: left;
  position: relative;
  opacity: 1;
  overflow: hidden;

  &__like {
    background-color: transparent;
    border-radius: 10px;
    border: 3px solid var(--primaryColor);
    box-shadow: 2px 2px 4px 1px #888;
    color: var(--primaryColor);
    display: block;
    font-size: 2rem;
    font-weight: 100;
    right: 20px;
    bottom: 20px;
    height: 55px;
    width: 55px;
    position: absolute;
    transition: all 0.3s linear;

    &:active {
      box-shadow: none;
      transform: translate(2px, 2px);
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__small-heading {
    color: var(--secondaryColor);
    font-size: 0.62rem;
  }

  &__title {
    font-size: 1.5rem;
    line-height: 1.75rem;
    font-weight: 900;
    margin-top: 15px;
    margin-bottom: 0;
    height: 3.5rem;
  }

  &__rooms {
    margin-top: auto;
  }

  &__rooms-qty {
    color: var(--secondaryColor);
    font-size: 6rem;
    line-height: 4rem;
    font-weight: 700;
    opacity: 1;
  }

  &__rooms-text {
    color: var(--secondaryColor);
    font-size: 1.25rem;
    left: 40px;
    bottom: 20px;
  }

  &__address {
    margin-top: 15px;
  }

  &__agent {
    font-size: 0.75rem;
    margin-top: 5px;
  }

  &:nth-child(2n) {
    background-color: #42b983;
  }
  &:nth-child(2n + 1) {
    background-color: peachpuff;
  }
}
</style>
