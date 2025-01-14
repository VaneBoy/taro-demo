<template>
  <nut-overlay overlay-class="c-dialog-overlay c-flex-row-center" :visible="show" :close-on-click-overlay="false">
    <slot></slot>
  </nut-overlay>
</template>

<script setup lang="ts">
import "./index.scss";

withDefaults(
  defineProps<{ show: boolean }>(),
  {
    show: false
  }
);
</script>
