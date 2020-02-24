<template lang="pug">
#action-popup-pane
  div This is a popup
  button(@click='buttonClickHandler') Send message to background!
  div(v-if='message') Reply from background: {{ message }}
</template>

<script>

import { broadcastMessage } from '@/lib/message-passing';
import { openExtensionOptionsPage } from '@/lib/chrome-helpers';


export default {
  data: () => ({
    enabled: false,
    message: '',
  }),
  computed: { },
  created() { },
  mounted() {
  },
  methods: {
    buttonClickHandler() {
      broadcastMessage({ ping: true }, (response) => {
        this.message = response;
      });
    },
  },
};
</script>

<style lang="less">
#action-popup-pane {
  min-width: 200px;
  padding: 5px;
}
</style>
