<template>
  <v-tooltip :top="top" :right="right" :bottom="bottom" :left="left">
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small icon v-bind="attrs" v-on="on" @click="evento(item)">
        <v-icon :color="corIcone">
          {{ icone }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ texto }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "TooltipComponent",
  data() {
    return {
      item: null,
    };
  },
  props: {
    top: {
      type: Boolean,
      required: false,
      default: false,
    },
    bottom: {
      type: Boolean,
      required: false,
      default: false,
    },
    right: {
      type: Boolean,
      required: false,
      default: false,
    },
    left: {
      type: Boolean,
      required: false,
      default: false,
    },
    texto: {
      type: String,
      required: false,
      default: "",
    },
    icone: {
      type: String,
      required: false,
      default: "",
    },
    corIcone: {
      type: String,
      required: false,
      default: "",
    },
  },

  methods: {
    evento(item) {
      this.$emit("click", item);
    },
  },
};
</script>

<style></style>
