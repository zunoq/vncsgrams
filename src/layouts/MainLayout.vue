<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-grey-10">
      <q-toolbar class="constrain justify-around">
        <q-toolbar-title class="grand-hotel text-bold">Blued </q-toolbar-title>
        <div class="large-screen-only">
          <q-btn
            class="q-mx-sm"
            flat
            round
            dense
            icon="eva-home-outline"
            to="/"
          />
          <q-btn
            class="q-mx-sm"
            flat
            round
            dense
            icon="eva-message-circle-outline"
            to="/messager"
          />
          <q-btn
            class="q-mx-sm"
            flat
            round
            dense
            icon="eva-video-outline"
            to="/camera"
          />
          <q-btn class="q-mx-sm" flat round dense icon="eva-bell-outline">
            <q-badge color="red" floating rounded> 4 </q-badge>
          </q-btn>
        </div>

        <q-separator vertical inset spaced class="large-screen-only" />

        <q-btn flat round dense class="q-mx-sm large-screen-only">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white small-screen-only">
      <q-tabs
        class="text-grey-10"
        active-color="black"
        indicator-color="transparent"
      >
        <q-route-tab name="Home" icon="eva-home-outline" to="/home" />
        <q-route-tab
          name="Message"
          icon="eva-message-circle-outline"
          to="/messager"
        />
        <q-route-tab name="Camera" icon="eva-video-outline" to="/camera" />
        <q-route-tab
          name="Notification"
          icon="eva-bell-outline"
          to="/notification"
        >
          <q-badge color="red" floating rounded> 4 </q-badge>
        </q-route-tab>
        <q-route-tab name="Profile" icon="eva-person-outline" to="/profile" />
      </q-tabs>
    </q-footer>
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<style lang="scss">
.q-footer {
  .q-tab__icon {
    font-size: 28px;
  }
}
.q-toolbar__title {
  font-size: 32px;
  line-height: 60px;
}
</style>
