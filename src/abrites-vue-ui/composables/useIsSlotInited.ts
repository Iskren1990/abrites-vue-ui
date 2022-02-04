import { computed, ComputedRef, Slot } from "vue";

const useIsSlotInited = (
  slots: Slot | undefined
): ComputedRef<boolean | undefined> => {
  const isInited = computed(
    () => slots && slots().findIndex((x) => x.type) != -1
  );
  return isInited;
};

export default useIsSlotInited;
