<template>
  <div class="buttons-container">
    <button :style="styleCss">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
    },
    styleCss: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.buttons-container {
  button {
    border-radius: 10px;
    padding: 5px;
    height: 35px;
    border: 1px solid #dcdcdc;
  }
}
</style>
