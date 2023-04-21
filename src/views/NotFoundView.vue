<template>
  <div class="not-found">
    <div class="robot">
      <img src="../assets/not-found.webp" alt="" />
    </div>
    <div class="description">
      <h3>Page Not Found!</h3>
      <router-link to="/" class="home-link">
        <h4>Click here to go home</h4>
      </router-link>
    </div>
  </div>
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

<style lang='css' scoped>
.not-found {
  background-color: var(--background-color);
  display: flex;
  flex-direction: row;
  padding-top: 100px;
  justify-content: center;
  align-items: center;
}

.not-found .robot {
  display: flex;
  justify-content: center;
}

.not-found .robot img {
  width: 77%;
}

.not-found .description {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
}

.not-found .description .home-link {
  text-decoration: none;
  border: 1px solid var(--background-color);
  color: var(--black);
  background-color: var(--background-color-buttons);
  padding: 12px 25px;
  font-size: 2.5rem;
  font-family: var(--font-family-base);
  border-radius: 25px;
  line-height: 1;
  border-bottom: 1px groove var(--faded-gray);
  letter-spacing: 0.7px;
  word-spacing: 2.5px;
}


.not-found .description .home-link:hover {
  border: 1px solid var(--gray);
}

.not-found .description h3 {
  border-bottom: 1px solid var(--background-color-tasks);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--black);
  font-family: var(--font-family-base);
}

@media (min-width: 756px) and (max-width: 1192px) {

  .not-found .description .home-link,
  .not-found .description h3 {
    font-size: 200%;
  }

  .not-found .robot {
    max-width: 350px;
    align-items: center;
  }

  .not-found {
    height: 70vh;
  }
}

@media screen and (min-width: 656px) and (max-width: 755px) {

  .not-found .description .home-link,
  .not-found .description h3 {
    font-size: 150%;
  }

  .not-found .robot {
    max-width: 350px;
    align-items: center;
  }

  .not-found {
    height: 70vh;
  }
}

@media (max-width: 655px) {

  .not-found .description .home-link,
  .not-found .description h3 {
    font-size: 150%;
  }

  .not-found .robot {
    max-width: 350px;
    align-items: center;
  }

  .not-found {
    height: 70vh;
    flex-direction: column;
    gap: 5rem;
  }

}
</style>