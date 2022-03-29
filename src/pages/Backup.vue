<template>
  <q-page class="constrain q-pa-sm">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8">
        <q-card class="my-card q-mb-md" v-for="post in posts" :key="post.id">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="post.userAvatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">{{ post.userName }}</q-item-label>
              <q-item-label caption>{{ post.location }}</q-item-label>
            </q-item-section>
          </q-item>
          <img :src="post.photo" />
          <q-card-section>
            <div class="text-bold">{{ post.title }}</div>
            <div class="text-caption text-grey">
              {{ dateconvert(post.date) }}
            </div>
            <div class="text">{{ post.content }}</div>
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
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      posts: [
        {
          id: 1,
          userAvatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          userName: "Long",
          location: "Ha Noi, VN",
          photo: "https://cdn.quasar.dev/img/parallax2.jpg",
          title: "Our Changing Planet",
          date: 1648179855532,
          content: "This is new Planet",
        },
        {
          id: 2,
          userAvatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          userName: "Quynh",
          location: "Ha Noi, VN",
          photo: "https://cdn.quasar.dev/img/parallax2.jpg",
          title: "Our Changing Planet",
          content: "This is new Planet",
          date: 1648179855532,
        },
        {
          id: 3,
          userAvatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          userName: "An",
          location: "Ha Noi, VN",
          photo: "https://cdn.quasar.dev/img/parallax2.jpg",
          title: "Our Changing Planet",
          content: "This is new Planet",
          date: 1648179855532,
        },
        {
          id: 4,
          userAvatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          userName: "Ha",
          location: "Ha Noi, VN",
          photo: "https://cdn.quasar.dev/img/parallax2.jpg",
          title: "Our Changing Planet",
          content: "This is new Planet",
          date: 1648179855532,
        },
      ],
    };
  },
  computed: {
    dateconvert() {
      return (timeStamp) => {
        return date.formatDate(timeStamp, "MMM DD HH:mm");
      };
    },
  },
});
</script>
