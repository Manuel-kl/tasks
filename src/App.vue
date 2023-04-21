<template>
  <div></div>
  <router-view />
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() { },
  methods: {},
  mounted() { },
};
</script>
<style lang='css' >
* {
  margin: 0;
  padding: 0;
}

#app {
  background-color: var(--background-color);
  height: 100vh;
}

:root {
  --font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  --font-family-tasks: InterVariable, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
  --background-color-tasks: #B7B7B7;
  --background-color: #BFCCB5;
  --background-color-buttons: #7C96AB;
  --white: #FFFFFF;
  --black: #000000;
  --faded-gray: #E5E5E5;
  --gray: #B7B7B7;
  --warning: rgb(206, 151, 151);
  --red: #FF0000;
  --success: rgb(146, 236, 146);
  --faded-blue: rgb(146, 146, 236);

}
</style>