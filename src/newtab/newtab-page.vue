<template lang="pug">
  div
    h1 Extension new tab page

    p Some setting - {{ setting1 }}

    button(@click='optionsButtonHandler') Go to extension options

</template>
<script>

import chromep from 'chrome-promise';

import { broadcastMessage } from '@/lib/message-passing';
import { openExtensionOptionsPage } from '@/lib/chrome-helpers';
import { getSetting } from '@/lib/storage-helpers';

export default {
  metaInfo: {
    title: 'My extension - new tab', // page title - will be visible on tab!
  },
  data: () => ({
    setting1: null,
  }),
  computed: { },
  created() { },
  async beforeMount() {
    this.setting1 = await getSetting('setting1');
  },
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
