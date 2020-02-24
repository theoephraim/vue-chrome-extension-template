<template lang="pug">
  div
    h1 Extension new tab page

    button(@click='optionsButtonHandler') Go to extension options

</template>
<script>

import { broadcastMessage } from '@/lib/message-passing';
import { openExtensionOptionsPage } from '@/lib/chrome-helpers';

export default {
  metaInfo: {
    title: 'My extension - new tab', // page title - will be visible on tab!
  },
  data: () => ({
  }),
  computed: { },
  created() { },
  mounted() {
    broadcastMessage('newtab initialized');
  },
  methods: {
    optionsButtonHandler() {
      openExtensionOptionsPage();
    },
  },
};
</script>
<style lang="less">
  div {
    color: blue
  }
</style>
