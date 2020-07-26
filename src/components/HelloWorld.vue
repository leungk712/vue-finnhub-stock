<template>
  <div class="hello">
    <button @click="hello"></button>
    <div v-if="this.company">
      {{ company }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },

  data() {
    return {
      testAPI: process.env.VUE_APP_TEST,
      stockTicker: "MO"
    };
  },

  methods: {
    hello() {
      const payload = {
        ticker: this.stockTicker
      };
      this.$store.dispatch("retrieveCompanyOverview", payload);
    }
  },

  computed: {
    ...mapState({
      company: state => state.company
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
