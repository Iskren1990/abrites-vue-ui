import { computed, ComputedRef, Slot } from "vue";

const useIsSlotInited = (
  slot: Slot | undefined
): ComputedRef<boolean | undefined> => {
  const isInited = computed(
    () => slot && slot().findIndex((x) => x.type) != -1
  );
  return isInited;
};

export default useIsSlotInited;
