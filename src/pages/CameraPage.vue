<template>
  <q-page class="constrain-camera q-pa-md">
    <div class="camera-frame q-pa-sm">
      <video ref="video" class="full-width" autoplay v-show="!imageCapture" />
      <canvas
        ref="canvas"
        class="full-width"
        height="240"
        v-show="imageCapture"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCamera"
        @click="capturePicture"
        :disable="imageCapture"
        outline
        round
        color="grey-10"
        icon="eva-camera-outline "
        size="lg"
      />
    </div>
    <q-file
      filled
      bottom-slots
      v-if="!hasCamera"
      v-model="photoUpload"
      label="Choose a picture"
      counter
      accept=""
      @input="capturePictureFallBack"
    >
      <template v-slot:prepend>
        <q-icon name="eva-attach-outline" @click.stop />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click.stop="photoUpload = null"
          class="cursor-pointer"
        />
      </template>
    </q-file>
    <div class="row justify-center q-pa-sm">
      <div class="col-12">
        <q-input v-model="post.caption" label="Caption" dense color="grey-10" />

        <q-input
          v-model="post.location"
          label="Location"
          dense
          color="grey-10"
          :loading="locationLoading"
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading"
              @click="getLocation"
              round
              dense
              flat
              icon="eva-navigation-2-outline"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center q-pa-md">
      <q-btn
        :disable="!post.caption || !post.photo || !post.location"
        @click="sendPost"
        outline
        label="Post"
        color="grey-10"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api, axios } from "boot/axios";
import { uid } from "quasar";
import { useQuasar } from "quasar";
const $q = useQuasar();

export default defineComponent({
  name: "CameraPage",
  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },
      imageCapture: false,
      hasCamera: true,
      photoUpload: [],
      locationLoading: false,
    };
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        });
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },
    capturePicture() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCapture = true;
      this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera();
    },
    capturePictureFallBack(file) {
      console.log(file);
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let contex = canvas.getContext("2d");
      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          contex.drawImage(img, 0, 0);
          this.imageCapture = true;
        };
        img.src = event.target.result;
      };
      if (file.path[0].files[0]) {
        reader.readAsDataURL(file.path[0].files[0]);
      }
      this.disableCamera();
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        (posistion) => {
          this.getCurrentPosition(posistion);
        },
        (err) => {
          this.locationError();
        },
        { timeout: 7000 }
      );
    },
    getCurrentPosition(posistion) {
      let apiURL = `https://geocode.xyz/${posistion.coords.latitude},${posistion.coords.longitude}?json=1`;
      axios
        .get(apiURL)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          const $q = useQuasar();
          this.$q.dialog({
            title: "Alert",
            message: "Something went wrong. Please try again",
          });
        });
      this.locationLoading = true;
    },
    locationSuccess(res) {
      console.log(res.data.city);
      this.post.location = res.data.city;
      if (res.data.country) {
        this.post.location += `, ${res.data.country}`;
      }
      this.locationLoading = false;
    },
    locationError(err) {
      this.locationLoading = false;
    },
    sendPost() {
      console.log("clicked");
      let formData = new FormData();
      formData.append("id", this.post.id);
      formData.append("caption", this.post.caption);
      formData.append("location", this.post.location);
      formData.append("date", this.post.date);
      formData.append("photo", this.post.photo, this.post.id + ".png");

      axios
        .post(`${process.env.API}/createPost`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.push("/");
      this.$q.notify({
        message: "Successfull",
        color: "grey-10",
        actions: [
          {
            label: "Back to home",
            color: "white",
            handler: () => {
              this.$router.push("/");
            },
          },
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
  },

  mounted() {
    this.initCamera();
  },
  beforeUnmount() {
    this.disableCamera();
  },
});
</script>
<style lang="scss">
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 4px;
}
</style>
