<script lang="ts">
import {
  defineComponent,
  toRefs,
  defineProps,
  withDefaults,
  defineEmits,
  defineExpose,
} from "vue";
export default defineComponent({
  name: "AbritesAmimatedIf",
});
</script>

<script lang="ts" setup>
interface IAnimatedIfProps {
  visible: boolean;
  speed?: number;
}
const props = withDefaults(defineProps<IAnimatedIfProps>(), { speed: 200 });
const emit = defineEmits<{
  (emit: "animation-state", isAnimating: boolean): void;
}>();

const { visible, speed } = toRefs(props);
let animate = new Animation();

const show = (el: Element, done: () => void) => {
  const newContentHeight = (el as HTMLElement).offsetHeight ?? 0;
  _animate(0, newContentHeight, el, done);
};

const hide = (el: Element, done: () => void) => {
  const oldContentHeight = (el as HTMLElement).offsetHeight ?? 0;
  _animate(oldContentHeight, 0, el, done);
};

const _animate = (
  fromHeight: number,
  toHeight: number,
  el: Element,
  done: () => void
) => {
  animate.cancel();

  animate = el.animate(
    [
      {
        height: fromHeight + "px",
        overflow: "hidden",
      },
      {
        height: toHeight + "px",
        overflow: "hidden",
      },
    ],
    {
      duration: speed.value,
      easing: "ease",
    }
  );

  animate.onfinish = function () {
    animate.cancel();
    emit("animation-state", visible.value);
    done();
  };
};
defineExpose({ show, hide });
</script>

<template>
  <transition @enter="show" @leave="hide" :duration="speed" :css="false">
    <div v-if="visible" class="transition-host" v-bind="$attrs">
      <slot></slot>
    </div>
  </transition>
</template>
