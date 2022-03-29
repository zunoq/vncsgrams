<template>
  <q-page class="constrain q-pa-sm">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8">
        <q-card class="my-card q-mb-md" v-for="post in posts" :key="post.id">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold"> zunoq </q-item-label>
              <q-item-label caption>{{ post.location }}</q-item-label>
            </q-item-section>
          </q-item>
          <img :src="post.photo" />
          <!-- TEST  -->
          <!-- <PhotoCarousel /> -->

          <!-- TEST -->
          <q-card-section>
            <q-item-label class="text-grey-9"><strong class="text-grey-10">zunoq</strong> {{ post.caption }}</q-item-label>
            <div class="text-caption text-grey">
              {{ dateconvert(post.date) }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">zunoq</q-item-label>
            <q-item-label caption>Long</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { date } from "quasar";
import { api, axios } from "boot/axios";

// import PhotoCarousel from "src/components/PhotoCarousel.vue";
export default defineComponent({
  name: "HomePage",
  // components: { PhotoCarousel },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getPosts() {
      axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          console.log(res);
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    dateconvert() {
      return (timeStamp) => {
        return date.formatDate(timeStamp, "MMM DD HH:mm");
      };
    },
  },

  created() {
    this.getPosts();
    console.log("created");
  },
});
</script>
