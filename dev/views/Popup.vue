<template>
  <AbritesButton @trigger="largeSizePopup.open()"
    >Large size popup</AbritesButton
  >
  <AbritesButton @trigger="defaultSizePopup.open()"
    >Default size popup</AbritesButton
  >
  <AbritesButton @trigger="smallSizePopup.open()"
    >Small size popup</AbritesButton
  >

  <AbritesPopup ref="largeSizePopup" popupClass="large">
    <div class="popup-header">My popup title</div>
    <div class="popup-content">
      <p>Lorem ipsum dolor sit amet...</p>
    </div>
    <div class="popup-footer">
      <AbritesButton flat light @trigger="largeSizePopup.close()"
        >Close</AbritesButton
      >
    </div>
  </AbritesPopup>

  <AbritesPopup ref="defaultSizePopup">
    <div class="popup-header">My popup title</div>
    <div class="popup-content">
      <p>Lorem ipsum dolor sit amet...</p>
    </div>
    <div class="popup-footer">
      <AbritesButton flat light @trigger="defaultSizePopup.close()"
        >Close</AbritesButton
      >
    </div>
  </AbritesPopup>

  <AbritesPopup ref="smallSizePopup" popupClass="small">
    <div class="popup-header">My popup title</div>
    <div class="popup-content">
      <p>Lorem ipsum dolor sit amet...</p>
    </div>
    <div class="popup-footer">
      <AbritesButton flat light @trigger="smallSizePopup.close()"
        >Close</AbritesButton
      >
    </div>
  </AbritesPopup>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const smallSizePopup = ref();
const defaultSizePopup = ref();
const largeSizePopup = ref();
</script>
