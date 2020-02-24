<template lang="pug">
  div
    h2 Dev tools tab 1

    h3 Message count = {{ numMessages }}
    h3 Last message:
    p(v-if='!lastMessage') <i>Nothing yet</i>
    p(v-else) {{ lastMessage }}

</template>
<script>

import { mapGetters } from 'vuex';

import { broadcastMessage } from '@/lib/message-passing';

export default {
  metaInfo: {
    title: 'Devtools tab 1', // page title - will be visible on tab!
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters(['numMessages', 'lastMessage']),
  },
  created() { },
  mounted() {
    broadcastMessage('dev tools tab 1 initialized');
  },
  methods: {
  },
};
</script>
<style lang="less">
</style>
