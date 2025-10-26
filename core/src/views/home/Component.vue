<script setup lang="ts">

import { ref, watch } from 'vue';
import { createEditor } from 'jet-edit';


// Defining the variables

const editor = ref<any>(null);


// Defining the watchers

watch(editor, (val: any): void => {
  createEditor(val);
}, { immediate: true });

</script>

<template>
  <div class="jetdocs_home_page h-full" ref="editor" />
</template>

<style>

.jetdocs_home_page {
  --jetedit-editor-padding: 1.5em;
  --jetedit-editor-controls-gap: calc(2 * 1.6 * var(--jetedit-editor-padding));
  --jetedit-editor-background: none;


  .jet_edit {
    height: 100%;

    .jet_edit_controls {
      display: none;
    }
  }
}

</style>