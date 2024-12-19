import VueDraggableResizable from 'vue-draggable-resizable';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('vue-draggable-resizable', VueDraggableResizable);
});