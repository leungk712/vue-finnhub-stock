<template>
  <div style="max-height: 500px; overflow-y: auto; width: 140%">
    <h5>Company News</h5>
    <div class="card" v-for="(news, i) in companyNews" :key="i">
      <div class="card-body text-left">
        <div class="row">
          <div class="col-2">
            <img
              v-if="news.image.length"
              :src="news.image"
              alt="Article image"
              width="90"
              height="90"
            />
          </div>
          <div class="col-8">
            <h5 class="card-title">
              <a class="news-headline" :href="news.url" target="_blank">
                {{ news.headline }}
              </a>
              <p class="news-date mt-2">
                Published: {{ dateRefactor(news.datetime) }}
              </p>
            </h5>
            <p>{{ news.summary.substring(0, 150) }}...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {};
  },

  methods: {
    dateRefactor(date) {
      return moment.unix(date).format("MMMM Do, YYYY");
    }
  },

  computed: {
    ...mapState({
      companyNews: state => state.companyNews
    })
  }
};
</script>

<style scoped>
.news-headline {
  color: black;
}

.news-date {
  font-size: 1rem;
}
</style>
