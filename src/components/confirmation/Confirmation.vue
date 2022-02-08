<script lang="ts" setup>
import { AbritesPopup } from "@/entry.esm";
import {
  defineEmits,
  withDefaults,
  defineProps,
  ref,
  toRefs,
  watchEffect,
} from "vue";
interface IConfirmationProps {
  message: string;
  open?: boolean;
  teleportTo?: string;
  yesButtonText?: string;
  noButtonText?: string;
}

const props = withDefaults(defineProps<IConfirmationProps>(), {
  open: false,
  teleportTo: "body",
  yesButtonText: "Yes",
  noButtonText: "No",
});

const emit = defineEmits<{
  (event: "answer", answer: boolean): void;
}>();

const { open, message, yesButtonText, noButtonText } = toRefs(props);
const popup = ref<typeof AbritesPopup>();

const triggerNo = () => {
  emit("answer", false);
  popup.value?.close();
};

const triggerYes = () => {
  emit("answer", true);
  popup.value?.close();
};

watchEffect(() => open.value && popup.value?.open());
</script>

<template>
  <teleport :to="teleportTo">
    <div class="confirmation-host" @confirm="confirm">
      <!-- <slot /> -->
      <AbritesPopup ref="popup" preventOverlayClose noCloseButton>
        <div class="popup-content">
          <h4>{{ message }}</h4>
        </div>

        <footer class="popup-footer no-gutter">
          <AbritesButton
            class="confirm-button flat wide large danger"
            @trigger="triggerNo"
            >{{ noButtonText }}</AbritesButton
          >

          <AbritesButton
            flat
            wide
            large
            success
            ref="yesButton"
            class="confirm-button"
            @trigger="triggerYes"
            >{{ yesButtonText }}</AbritesButton
          >
        </footer>
      </AbritesPopup>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.popup-content {
  text-align: center;
}
</style>
