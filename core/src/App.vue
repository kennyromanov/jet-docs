<script setup lang="ts">

import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';
import Layout from '@/components/Layout.vue';

</script>

<template>
  <Layout>
    <RouterView />
  </Layout>

  <Toaster position="bottom-center" theme="dark" />
</template>